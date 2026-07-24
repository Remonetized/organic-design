function createProjectAutomation({ github, context, core }) {
  const env = process.env;

  const config = {
    projectNumber: Number(env.GITBAN_PROJECT_NUMBER || env.PROJECT_NUMBER || "1"),
    projectOwner: env.GITBAN_PROJECT_OWNER || env.PROJECT_OWNER || context.repo.owner,
    projectOwnerType: (env.GITBAN_PROJECT_OWNER_TYPE || env.PROJECT_OWNER_TYPE || "organization").toLowerCase(),
    statusFieldName: env.GITBAN_STATUS_FIELD || env.STATUS_FIELD_NAME || "Status",
    backlogStatus: env.GITBAN_BACKLOG_STATUS || "Backlog",
    hotfixStatus: env.GITBAN_HOTFIX_STATUS || "Hotfix",
    inProgressStatus: env.GITBAN_IN_PROGRESS_STATUS || env.TARGET_STATUS || "In Progress",
    blockedStatus: env.GITBAN_BLOCKED_STATUS || "Blocked",
    inReviewStatus: env.GITBAN_IN_REVIEW_STATUS || "In Review",
    doneStatus: env.GITBAN_DONE_STATUS || "Done",
    mergeLogStatus: env.GITBAN_MERGE_LOG_STATUS || "Merge Log",
    startDateFieldName: env.GITBAN_START_DATE_FIELD || env.START_DATE_FIELD_NAME || "Start date",
    endDateFieldName: env.GITBAN_END_DATE_FIELD || "End date",
    targetDateFieldName: env.GITBAN_TARGET_DATE_FIELD || env.TARGET_DATE_FIELD_NAME || "Target date",
  };

  function today() {
    return new Date().toISOString().slice(0, 10);
  }

  async function loadProjectForType(ownerType) {
    const ownerField = ownerType === "user" ? "user" : "organization";
    const query = `
      query($owner: String!, $number: Int!) {
        ${ownerField}(login: $owner) {
          projectV2(number: $number) {
            id
            number
            fields(first: 100) {
              nodes {
                ... on ProjectV2SingleSelectField {
                  id
                  name
                  options { id name }
                }
                ... on ProjectV2FieldCommon {
                  id
                  name
                  dataType
                }
              }
            }
          }
        }
      }
    `;

    const response = await github.graphql(query, {
      owner: config.projectOwner,
      number: config.projectNumber,
    });

    return response[ownerField]?.projectV2;
  }

  async function loadProject() {
    const ownerTypes = config.projectOwnerType === "user"
      ? ["user", "organization"]
      : ["organization", "user"];

    let lastError;
    for (const ownerType of ownerTypes) {
      try {
        const project = await loadProjectForType(ownerType);
        if (project) {
          core.info(`Loaded ${ownerType} project #${config.projectNumber} for ${config.projectOwner}.`);
          return project;
        }
      } catch (error) {
        lastError = error;
        core.info(`Project lookup as ${ownerType} did not succeed: ${error.message}`);
      }
    }

    const suffix = lastError ? ` Last error: ${lastError.message}` : "";
    throw new Error(`Project not found: owner=${config.projectOwner} number=${config.projectNumber}.${suffix}`);
  }

  function findStatusOption(project, statusName) {
    const statusField = project.fields.nodes.find((field) => field?.name === config.statusFieldName && field.options);
    if (!statusField) {
      throw new Error(`Single-select field not found: ${config.statusFieldName}`);
    }

    const option = statusField.options.find((item) => item.name === statusName);
    if (!option) {
      throw new Error(`Status option not found: ${statusName}`);
    }

    return { statusField, option };
  }

  function findDateField(project, fieldName) {
    return project.fields.nodes.find((field) => field?.name === fieldName && field.dataType === "DATE");
  }

  async function getProjectItem(contentNodeId) {
    const query = `
      query($id: ID!) {
        node(id: $id) {
          ... on Issue {
            projectItems(first: 50) {
              nodes {
                id
                project { ... on ProjectV2 { id number } }
                fieldValues(first: 50) {
                  nodes {
                    ... on ProjectV2ItemFieldDateValue {
                      date
                      field { ... on ProjectV2FieldCommon { id name } }
                    }
                  }
                }
              }
            }
          }
          ... on PullRequest {
            projectItems(first: 50) {
              nodes {
                id
                project { ... on ProjectV2 { id number } }
                fieldValues(first: 50) {
                  nodes {
                    ... on ProjectV2ItemFieldDateValue {
                      date
                      field { ... on ProjectV2FieldCommon { id name } }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const response = await github.graphql(query, { id: contentNodeId });
    return response.node?.projectItems?.nodes?.find(
      (item) => item.project?.number === config.projectNumber
    );
  }

  async function addContentToProject(project, contentNodeId) {
    const mutation = `
      mutation($projectId: ID!, $contentId: ID!) {
        addProjectV2ItemById(input: { projectId: $projectId, contentId: $contentId }) {
          item { id }
        }
      }
    `;

    const response = await github.graphql(mutation, {
      projectId: project.id,
      contentId: contentNodeId,
    });

    return response.addProjectV2ItemById.item;
  }

  async function ensureProjectItem(project, contentNodeId) {
    const existing = await getProjectItem(contentNodeId);
    if (existing) {
      return existing;
    }

    core.info("Content is not on the project yet. Adding it now.");
    return addContentToProject(project, contentNodeId);
  }

  async function updateField(projectId, itemId, fieldId, value) {
    const mutation = `
      mutation($projectId: ID!, $itemId: ID!, $fieldId: ID!, $value: ProjectV2FieldValue!) {
        updateProjectV2ItemFieldValue(
          input: {
            projectId: $projectId,
            itemId: $itemId,
            fieldId: $fieldId,
            value: $value
          }
        ) {
          projectV2Item { id }
        }
      }
    `;

    await github.graphql(mutation, { projectId, itemId, fieldId, value });
  }

  async function clearField(projectId, itemId, fieldId) {
    const mutation = `
      mutation($projectId: ID!, $itemId: ID!, $fieldId: ID!) {
        clearProjectV2ItemFieldValue(
          input: {
            projectId: $projectId,
            itemId: $itemId,
            fieldId: $fieldId
          }
        ) {
          projectV2Item { id }
        }
      }
    `;

    await github.graphql(mutation, { projectId, itemId, fieldId });
  }

  async function setStatus(project, item, statusName) {
    const { statusField, option } = findStatusOption(project, statusName);
    await updateField(project.id, item.id, statusField.id, { singleSelectOptionId: option.id });
    core.info(`Moved project item to "${statusName}".`);
  }

  async function setDateIfEmpty(project, item, fieldName, dateValue) {
    const dateField = findDateField(project, fieldName);
    if (!dateField) {
      core.info(`Date field "${fieldName}" not found. Skipping.`);
      return;
    }

    const existing = (item.fieldValues?.nodes || []).find((value) => value?.field?.name === fieldName)?.date;
    if (existing) {
      core.info(`${fieldName} already set to ${existing}.`);
      return;
    }

    await updateField(project.id, item.id, dateField.id, { date: dateValue });
    core.info(`Set ${fieldName} to ${dateValue}.`);
  }

  async function clearDateField(project, item, fieldName) {
    const dateField = findDateField(project, fieldName);
    if (!dateField) {
      core.info(`Date field "${fieldName}" not found. Skipping clear.`);
      return;
    }

    const existing = (item.fieldValues?.nodes || []).find((value) => value?.field?.name === fieldName)?.date;
    if (!existing) {
      core.info(`${fieldName} is already empty.`);
      return;
    }

    await clearField(project.id, item.id, dateField.id);
    core.info(`Cleared ${fieldName}.`);
  }

  async function moveContent(contentNodeId, statusName, options = {}) {
    const project = await loadProject();
    const item = await ensureProjectItem(project, contentNodeId);
    await setStatus(project, item, statusName);

    if (options.startDate) {
      await setDateIfEmpty(project, item, config.startDateFieldName, today());
    }

    if (options.endDate) {
      await setDateIfEmpty(project, item, config.endDateFieldName, today());
    }

    if (options.targetDate) {
      await setDateIfEmpty(project, item, config.targetDateFieldName, today());
    }
  }

  async function resetContentToBacklog(contentNodeId) {
    const project = await loadProject();
    const item = await ensureProjectItem(project, contentNodeId);
    await setStatus(project, item, config.backlogStatus);
    await clearDateField(project, item, config.startDateFieldName);
    await clearDateField(project, item, config.endDateFieldName);
    await clearDateField(project, item, config.targetDateFieldName);
  }

  async function getClosingIssueNodeIds(pullRequestNodeId) {
    const query = `
      query($id: ID!) {
        node(id: $id) {
          ... on PullRequest {
            closingIssuesReferences(first: 20) {
              nodes { id number title }
            }
          }
        }
      }
    `;

    const response = await github.graphql(query, { id: pullRequestNodeId });
    const issues = response.node?.closingIssuesReferences?.nodes || [];
    core.info(`Found ${issues.length} linked closing issue(s).`);
    return issues.map((issue) => issue.id);
  }

  async function moveLinkedIssuesFromPullRequest(statusName, options = {}) {
    const pullRequestNodeId = context.payload.pull_request?.node_id;
    if (!pullRequestNodeId) {
      core.info("No pull request node id found. Skipping.");
      return;
    }

    const issueNodeIds = await getClosingIssueNodeIds(pullRequestNodeId);
    for (const issueNodeId of issueNodeIds) {
      await moveContent(issueNodeId, statusName, options);
    }
  }

  return {
    config,
    moveIssueToBacklog: () => moveContent(context.payload.issue.node_id, config.backlogStatus),
    resetIssueToBacklog: (issueNodeId) => resetContentToBacklog(issueNodeId || context.payload.issue.node_id),
    moveIssueToHotfix: () => moveContent(context.payload.issue.node_id, config.hotfixStatus),
    moveIssueToInProgress: () => moveContent(context.payload.issue.node_id, config.inProgressStatus, { startDate: true }),
    moveIssueToBlocked: () => moveContent(context.payload.issue.node_id, config.blockedStatus),
    moveIssueToDone: () => moveContent(context.payload.issue.node_id, config.doneStatus, { endDate: true, targetDate: true }),
    moveLinkedIssuesToReview: () => moveLinkedIssuesFromPullRequest(config.inReviewStatus),
    moveLinkedIssuesToInProgress: () => moveLinkedIssuesFromPullRequest(config.inProgressStatus, { startDate: true }),
    moveLinkedIssuesToDone: () => moveLinkedIssuesFromPullRequest(config.doneStatus, { endDate: true, targetDate: true }),
    addPullRequestToMergeLog: () => moveContent(context.payload.pull_request.node_id, config.mergeLogStatus, { endDate: true }),
  };
}

module.exports = createProjectAutomation;

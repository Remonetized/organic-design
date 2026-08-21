<?php $title='Curvilinear UI'; $page='API'; ?>
<?php include 'includes/header.php'; ?>

<div class="container-fluid px-0">
    <div class="row g-0">
        <section class="col-12 col-lg-auto sidebar bg-light border-end">
            <div class="w3-bar-block">
                <div class="w3-bar-item">
                    <h1 class="h3 text-secondary mb-0 mt-2 ms-0">Navigation</h1>
                </div>
                <a class="w3-bar-item w3-button w3-small<?php if($page=="Home") echo ' active';?>" href="index.php">Div</a>
                <a class="w3-bar-item w3-button w3-small<?php if($page=="API") echo ' active';?>" href="api.php">API</a>
            </div>
        </section>

        <section class="col p-3">
            <!-- <div class="border rounded p-3">
                <h2 class="h4 mb-2">Div</h2>
                <p class="mb-0">
                    Curvilinear element generator content will be added here.
                </p>
            </div> -->

            <div class="container w3-border w3-border-grey p-3" style="min-width:1000px">
      <div class="container-fluid mt-3">
        <div class="row">
          <div class="col-5">
            <div class="row mt-2 pt-2">
              <div class="col-6"><label for="customRange3" class="form-label">Div Width</label></div>
              <div class="col-6"><input type="range" class="form-range" min="40" max="780" id="divWidth" value="278"></div>
              <!-- <div class="col-6"><input type="number" class="" min="40" max="780" id="divWidth"></div> -->

            </div>
            <div class="row mt-2">
              <div class="col-6"><label for="customRange3" class="form-label">Div Height</label></div>
              <div class="col-6"><input type="range" class="form-range" min="40" max="780" id="divHeight" value="278"></div>
              <!-- <div class="col-6"><input type="number" class="" min="40" max="780" id="divHeight"></div> -->
            </div>
            <div class="row mt-2">
              <div class="col-6">
                <label for="style" class="form-label">Edge Style:</label>
              </div>
              <div class="col-6">
                <select class="form-select" name="style" id="style">
                  <!-- <option>Normal</option> -->
                  <option>Rectangular Curved</option>
                  <option>Rectangular Jagged</option>
                  <option>Circular</option>
                </select>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-6"><label for="divDetail" class="form-label">Edge Detail</label></div>
              <div class="col-6"><input type="range" class="form-range" min="2" max="14" step="2" id="divDetail"></div>
            </div>
            <div class="row mt-2">
              <div class="col-6"><label for="divVariation" class="form-label">Edge Variation</label></div>
              <div class="col-6"><input type="range" class="form-range" min="2" max="30" id="divVariation"></div>
            </div>
            <div class="row mt-2">
              <div class="col-6"><label for="deviation" class="form-label">Deviation</label></div>
              <div class="col-6"><input type="range" class="form-range" min="1" max="5" id="deviation"></div>
            </div>
            <div class="row mt-2">
              <div class="col-6">
                <label for="backcolour" class="form-label">Background Colour:</label>
              </div>
              <div class="col-6">
                <input type="color" class="w-100" id="backcolour" name="backcolour" value="#BBBBBB">
              </div>
            </div>
            <!-- <div class="row mt-2">
              <div class="col-1">
                <input class="form-check-input" type="checkbox" id="borderCheck" name="borderCheck" value="something" checked>
              </div>
              <div class="col-5">
                <label for="bordercolour" class="form-label">Border Colour:</label>
              </div>
              <div class="col-6">
                <input type="color" class="w-100" id="bordercolour" name="bordercolour" value="#000000">
              </div>
            </div> -->
            <div class="row mt-2">
              <div class="col d-grid">
                <button type="button" class="btn btn-primary btn-block text-white" onclick="APILink('orgDiv')">Generate Div</button>
              </div>
            </div>
          </div>
          <div class="col-7 bg-light p-2">
            <div class="row">
              <div class="col">
                <h3 class="h3">HTML <span class="w3-right fa fa-clone" onclick="copyCode('divHTML')"></span></h3>
                <div class="alert alert-success alert-dismissible fade show copyAlert" id="divHTMLcopy">
                  <button type="button" class="btn-close" onclick="this.parentElement.style.display='none'"></button>
                  <div id="divHTMLalert"></div>
                </div>
                <div class="w3-panel w3-white border-start border-5 border-primary">
                  <pre id="divHTML" class="w3-text-grey">
                  </pre>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <h3 class="h3">CSS <span class="w3-right fa fa-clone" onclick="copyCode('divCSS')"></span></h3>
                <div class="alert alert-success alert-dismissible fade show copyAlert" id="divCSScopy">
                  <button type="button" class="btn-close" onclick="this.parentElement.style.display='none'"></button>
                  <div id="divCSSalert"></div>
                </div>
                <div class="w3-panel w3-white border-start border-5 border-primary">
                  <pre id="divCSS" class="w3-text-grey">
                  </pre>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <h3 class="h3">SASS Variables <span class="w3-right fa fa-clone" onclick="copyCode('divSASS')"></span></h3>
                <div class="alert alert-success alert-dismissible fade show copyAlert" id="divSASScopy">
                  <button type="button" class="btn-close" onclick="this.parentElement.style.display='none'"></button>
                  <div id="divSASSalert"></div>
                </div>
                <div class="w3-panel w3-white border-start border-5 border-primary">
                  <pre id="divSASS" class="w3-text-grey">
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


        </section>
    </div>
</div>

<script src="js/scripts.js"></script>
<script></script>
<?php include 'includes/footer.php'; ?>

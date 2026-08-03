<?php $title='Curvilinear UI'; $page='Home'; ?>
<?php include 'includes/header.php'; ?>

<div class="container-fluid px-0">
    <div class="row g-0">
        <section class="col-12 col-lg-auto sidebar bg-light border-end">
            <div class="w3-bar-block">
                <div class="w3-bar-item">
                    <h1 class="h3 text-secondary mb-0 mt-2 ms-0">Navigation</h1>
                </div>
                <a class="w3-bar-item w3-button w3-small<?php if($page=="Home") echo ' active';?>" href="index.php">Div</a>
                <a class="w3-bar-item w3-button w3-small<?php if($page=="") echo ' active';?>" href="api.php">API</a>
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
      <div id="orgDivContainer" class="">
        <div id="orgDiv" class="me-2"></div>
        <p class="text-secondary">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque imperdiet libero eu neque facilisis. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit architecto aspernatur suscipit error saepe laudantium ipsam sed laboriosam illum adipisci. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa exercitationem minus sint consequuntur voluptas harum quos error delectus deserunt quaerat quis veritatis cum, a amet sapiente architecto? Unde porro nihil magni blanditiis facere quam aliquid eum labore ipsum harum fuga nostrum minima voluptate quidem neque, saepe repellendus. Cumque ea excepturi consectetur vitae ipsa eligendi qui quisquam, alias autem rerum praesentium quam ex quod modi nesciunt, voluptatibus, ut nihil! Dolor non aliquam nesciunt repudiandae voluptatum placeat ratione suscipit quod, quasi, eligendi dolores blanditiis veniam amet ab cumque ad totam voluptatem rem? Voluptate excepturi quae ipsum omnis consequatur quidem incidunt ea. Quibusdam!Unde porro nihil magni blanditiis facere quam aliquid eum labore ipsum harum fuga nostrum minima voluptate quidem neque, saepe repellendus. Cumque ea excepturi consectetur vitae ipsa eligendi qui quisquam, alias autem rerum praesentium quam ex quod modi nesciunt, voluptatibus, ut nihil! Dolor non aliquam nesciunt repudiandae voluptatum placeat ratione suscipit quod, quasi, eligendi dolores blanditiis veniam amet ab cumque ad totam voluptatem rem? Voluptate excepturi quae ipsum omnis consequatur quidem incidunt ea. Quibusdam!</p>
      </div>
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
              <div class="col-6"><input type="range" class="form-range" min="40" max="780" id="divHeight" value="466"></div>
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
                  <option>Circular Jagged</option>
                </select>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-6"><label for="divDetail" class="form-label">Edge Detail</label></div>
              <div class="col-6"><input type="range" class="form-range" min="20" max="100" id="divDetail"></div>
            </div>
            <div class="row mt-2">
              <div class="col-6"><label for="divVariation" class="form-label">Edge Variation</label></div>
              <div class="col-6"><input type="range" class="form-range" min="2" max="30" id="divVariation"></div>
            </div>
            <div class="row mt-2">
              <div class="col-6">
                <label for="backcolour" class="form-label">Background Colour:</label>
              </div>
              <div class="col-6">
                <input type="color" class="w-100" id="backcolour" name="backcolour" value="#BBBBBB">
              </div>
            </div>
            <div class="row mt-2">
              <div class="col d-grid">
                <button type="button" class="btn btn-primary btn-block text-white" onclick="divFunc('orgDiv')">Generate Div</button>
              </div>
            </div>
          </div>
          <div class="col-7 bg-light p-2">
            <div class="row">
              <div class="col">
                <h3 class="h3">HTML</h3>
                <div class="w3-panel w3-white border-start border-5 border-primary">
                  <pre id="divHTML" class="w3-text-grey">
                  </pre>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <h3 class="h3">CSS</h3>
                <div class="w3-panel w3-white border-start border-5 border-primary">
                  <pre id="divCSS" class="w3-text-grey">
                  </pre>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <h3 class="h3">SASS Variables</h3>
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

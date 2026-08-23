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
                <a class="w3-bar-item w3-button w3-small<?php if($page=="API") echo ' active';?>" href="apipage.php">API</a>
            </div>
        </section>

        <section class="col p-3">
            <!-- <div class="border rounded p-3">
                <h2 class="h4 mb-2">Div</h2>
                <p class="mb-0">
                    Curvilinear element generator content will be added here.
                </p>
            </div> -->

            <div class="container" style="min-width:1000px">
      <div class="container-fluid w3-border w3-border-grey p-3 mt-3">
        <div class="row">
          <div class="col">
            <h1 class="h1">Curvilinear Element API</h1>
            <p>This prototype API returns a clip-path that can be applied to divs with a curved outline. It optionally also provides a polygonal path that can be used with the CSS shape-outside to push text outside the boundary, as demonstrated below.</p>
            <h2 class="h2">How to use the API</h2>
            <p>Enter the API call into the text box below to generate elements, they will be applied to the div below. Note that no limits are placed on the values, but they may not work as expected outside the suggested range.</p>
            
          </div>
        </div>
      </div>
      <div class="container-fluid w3-border w3-border-grey p-3 mt-3">
        <div class="row m-1 pb-3 border-bottom">
          <div class="col-1">
            <label for="style" class="form-label">API Call:</label>
          </div>
          <div class="col">
            <input id="APIRequest" type="text" class="form-control form-control-sm" value="https://organicdesign.click/prototype/api.php?h=278&w=278&detail=9&variation=16&deviation=3">
          </div>
          <div class="col-1">
            <button id="submitRequest" type="button" class="btn btn-primary btn-sm">Send</button>
          </div>
        </div>
        <div class="row my-2">
          <div class="col">
            <h3 class="h3">JSON Response</h3>
            <div id="JSON" class="container-fluid bg-dark text-white rounded">Awaiting input</div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col">
            <h3 class="h3">Demonstration</h3>
          <div id="curveDivContainer" class="">
        <div id="curveDiv" class="me-2"></div>
        <p class="text-secondary">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque imperdiet libero eu neque facilisis. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit architecto aspernatur suscipit error saepe laudantium ipsam sed laboriosam illum adipisci. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa exercitationem minus sint consequuntur voluptas harum quos error delectus deserunt quaerat quis veritatis cum, a amet sapiente architecto? Unde porro nihil magni blanditiis facere quam aliquid eum labore ipsum harum fuga nostrum minima voluptate quidem neque, saepe repellendus. Cumque ea excepturi consectetur vitae ipsa eligendi qui quisquam, alias autem rerum praesentium quam ex quod modi nesciunt, voluptatibus, ut nihil! Dolor non aliquam nesciunt repudiandae voluptatum placeat ratione suscipit quod, quasi, eligendi dolores blanditiis veniam amet ab cumque ad totam voluptatem rem? Voluptate excepturi quae ipsum omnis consequatur quidem incidunt ea. Quibusdam!Unde porro nihil magni blanditiis facere quam aliquid eum labore ipsum harum fuga nostrum minima voluptate quidem neque, saepe repellendus. Cumque ea excepturi consectetur vitae ipsa eligendi qui quisquam, alias autem rerum praesentium quam ex quod modi nesciunt, voluptatibus, ut nihil! Dolor non aliquam nesciunt repudiandae voluptatum placeat ratione suscipit quod, quasi, eligendi dolores blanditiis veniam amet ab cumque ad totam voluptatem rem? Voluptate excepturi quae ipsum omnis consequatur quidem incidunt ea. Quibusdam!</p>
      </div>
          </div>
        </div>
      </div>
    </div>


        </section>
    </div>
</div>

<script>
    const submitBtn = document.querySelector("#submitRequest");
    const json_result = document.querySelector("#JSON");

    submitBtn.addEventListener("click", async () => {
      const response = await fetch(
        "./api.php?h=278&w=278&detail=9&variation=16&deviation=3"
      );

      const data = await response.json();

      const output = JSON.stringify(data);
      json_result.innerHTML = output;
    });
    document.getElementById('curveDiv').style.clipPath = data.path;
    document.getElementById('curveDiv').style.shapeOutside = data.polygon;
  </script>


<?php include 'includes/footer.php'; ?>

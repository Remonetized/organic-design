<nav class="navbar navbar-expand-lg navbar-dark bg-primary py-1" style="z-index:1000;">
  <div class="container-fluid px-2">

    <!-- 1) Brand -->
    <a class="navbar-brand border border-white border-2 rounded order-1" href="apipage.php">
      <span class="bg-primary py-0 px-1">API</span>
    </a>
      <!-- toggler only on mobile -->
      <button class="navbar-toggler d-lg-none order-2" type="button"
              data-bs-toggle="collapse" data-bs-target="#navbar"
              aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    <!-- 3) Right controls (always visible) -->
    <div class="ms-auto d-flex align-items-center gap-2 order-2 order-lg-3">


      

      <div class="nav-item w3-dropdown-hover position-relative">
        <button class="btn" type="button" aria-label="User Icon">
          <i class="fa-solid fa-user text-white mb-3"></i>
        </button>
        <div class="w3-dropdown-content w3-bar-block bg-primary shadow-sm user-dropdown position-absolute end-0" style="z-index:100;min-width:120px;">
            <div class="d-flex justify-content-between align-items-center">
              <i class="fa fa-user-o text-white ps-3"></i><a class="w3-bar-item nav-link text-white text-end cpoint" onclick="loginModal()">Login</a>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <i class="fa-solid fa-user-plus text-white ps-3"></i><a class="w3-bar-item nav-link text-white text-end cpoint" onclick="registerModal()">Register</a>
            </div>
        </div>
      </div>
    </div>

    <!-- 2) Collapsible middle block -->
    <div class="collapse navbar-collapse order-3 order-lg-2 mt-2 pb-2 mt-lg-0 flex-lg-grow-1" id="navbar">
      <ul class="navbar-nav text-uppercase mb-2 mb-lg-0">
        <li class="nav-item"><a class="nav-link ps-2" href="about.php">About</a></li>
        <li class="nav-item"><a class="nav-link ps-2" href="">Templates</a></li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle ps-2" href="" data-bs-toggle="dropdown">Version</a>
          <ul class="dropdown-menu bg-primary mt-2">
            <li><a class="dropdown-item text-white" href="">version 0.0.1</a></li>
            <li><a class="dropdown-item text-white" href="">version 0.0.2</a></li>
          </ul>
        </li>
      </ul>

      <!-- push search to the right on lg -->
      <form class="d-flex ms-lg-auto" action="search.html">
        <div class="position-relative">
          <input class="form-control form-control-sm pe-5" type="text" placeholder="Search.." name="search">
          <button class="btn btn-link position-absolute top-50 end-0 translate-middle-y" type="submit">
            <i class="fa fa-search"></i>
          </button>
        </div>
      </form>
    </div>

  </div>
</nav>

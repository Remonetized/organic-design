function loginModal() {
    var registerModal = document.getElementById("registerModal");
    var loginModal = document.getElementById("loginModal");
    registerModal.style.display = "none";
    loginModal.style.display = "block";
}

function logoutModal() {
    var logoutModal = document.getElementById("logoutModal");
    logoutModal.style.display = "block";
}

function registerModal() {
    var loginModal = document.getElementById("loginModal");
    var registerModal = document.getElementById("registerModal");
    loginModal.style.display = "none";
    registerModal.style.display = "block";
}

function showModal($modalID) {
    var modal = document.getElementById($modalID);
    modal.style.display = "block";
}

function closeModal(modalID) {
    if (modalID !== undefined) {
      var modal = document.getElementById(modalID);
      modal.style.display="none";
    }
    else {
      var modal = document.getElementsByClassName('modal');
      for (let i = 0; i <= 100; i++) {
          modal[i].style.display="none";
      }
    }
}

function copyCode(id) {
    var txtCode = document.getElementById(id).innerText;
    var alert = document.getElementById(id + 'copy');
    var alertMsg = document.getElementById(id + 'alert');
    alert.style.display = "block";
    navigator.clipboard.writeText(txtCode).then(
      () => {
        // alert('copied');        
        alertMsg.innerHTML = "Copied to clipboard."
      },
      () => {
        // alert('failed');
        alertMsg.innerHTML = "Unable to copy";
      },
    );
  }

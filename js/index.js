var siteName = document.querySelector("#siteName");
var siteUrl = document.querySelector("#siteUrl");
var submitBtn = document.querySelector(".submit-btn");
var tbody = document.querySelector("tbody");
var inputs = document.querySelectorAll(".form input");

if (localStorage.getItem("BookMarks") != null) {
  websites = JSON.parse(localStorage.getItem("BookMarks"));
  displayData();
} else {
  var websites = [];
}

function addBookMark() {
  var website = {
    webName: siteName.value,
    webUrl: siteUrl.value,
  };
  websites.push(website);
  localStorage.setItem("BookMarks", JSON.stringify(websites));
  displayItem();
}

function clearInputs() {
  siteName.value = null;
  siteUrl.value = null;
}

function displayItem() {
  tbody.innerHTML += `<tr>
  <td>${websites.length}</td>
  <td>${websites[websites.length - 1].webName}</td>
  <td><a href=${websites[websites.length - 1].webUrl
    } target="_blank" id="siteLink"><button class="btn btn-success"><i class="fa-solid fa-eye"></i> Visit </button></a></td>
  <td><button class="btn btn-danger" onclick="deleteItem(${websites.length - 1
    });"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
 </tr>`;
}

function displayData() {
  var container = '';
  for (var i = 0; i < websites.length; i++) {
    container += `<tr>
  <td>${i + 1}</td>
  <td>${websites[i].webName}</td>
  <td><a href=${websites[i].webUrl
      } target="_blank" id="siteLink"><button class="btn btn-success"><i class="fa-solid fa-eye"></i> Visit </button></a></td>
  <td><button class="btn btn-danger" onclick="deleteItem(${i});"><i class="fa-solid fa-trash-can"></i> Delete </button></td>
 </tr>`;
  }
  tbody.innerHTML = container;
}

function deleteItem(index) {
  websites.splice(index, 1);
  localStorage.setItem("BookMarks", JSON.stringify(websites));
  displayData();
}

for(var i = 0 ; i < inputs.length; i++){
  inputs[i].addEventListener('input',function(){
    validateInput(this) 
  })
}

function validateInput(input) {
  var regex = {
    siteName: /^\w{3}/i,
    siteUrl: /\b(?:https?|ftp):\/\/(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?\b/
  }

  if (regex[input.id].test(input.value)) {
    if (input.classList.contains("is-invalid")) {
      input.classList.replace("is-invalid", "is-valid");
    } else {
      input.classList.add("is-valid");
    }
    return true;
  } else {
    input.classList.add("is-invalid");
    return false;
  }
}
submitBtn.addEventListener("click", function () {
    if (validateInput(siteName) && validateInput(siteUrl)) {
      addBookMark();
      clearInputs();
    } else {
      Swal.fire({
        html: `<div class="bg-white rounded text-start">
                  <header class="d-flex gap-2 my-3">
                      <i class="fa-solid fa-circle text-danger"></i>
                      <i class="fa-solid fa-circle text-warning"></i>
                      <i class="fa-solid fa-circle text-success"></i>
                  </header>
                  <h3 class="fs-5 py-3 text-dark">Site Name or Url is not valid, Please follow the rules below :</h3>
                  <p class=" text-dark fw-normal"><i class="fa-solid fa-circle-arrow-right text-danger mx-1"></i> Site name must contain at least 3 characters</p>
                  <p class="text-dark fw-normal py-2"><i class="fa-solid fa-circle-arrow-right text-danger mx-1"></i> Site URL must be a valid one</p>
              </div>`,
        showCloseButton: true,
        showConfirmButton: false
      });
    }
   
  });
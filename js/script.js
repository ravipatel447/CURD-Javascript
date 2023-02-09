"use-strict";
const table = document.querySelector(".table");
const createProductBtn = document.querySelector(".cProduct");
const createProduct = document.querySelector(".createProduct");
const modal = document.querySelector(".modal--createProduct");
const btns = document.querySelector(".button--wrapper");
const overlay = document.querySelector(".overlay");
const tableHeader = document.querySelector(".header");
let products = JSON.parse(window.localStorage.getItem("products")) || [];
let selectId = document.querySelector("#selectId");
let search = document.querySelector("#search");
const rendar = ({
  productId,
  productName,
  productImageSrc,
  productPrice,
  productDesc,
}) => {
  var html = `<tr>
    <td>${productId}</td>
    <td class="capitalize">${productName}</td>
    <td>
        <img src="${productImageSrc}"/>
    </td>
    <td>${productPrice}$</td>
    <td class="capitalize">${productDesc}</td>
    <td class="accessibility">
      <button class="btn view" onClick="viewProduct(${productId})">View</button>
      <button class="btn edit" onClick="editProduct(${productId})">Edit</button>
      <button class="btn delete" onClick="deleteProduct(${productId})">Delete</button>
    </td>
  </tr>`;
  document.querySelector(".table").insertAdjacentHTML("beforeend", html);
};

function renderOptions() {
  document.querySelector("#selectId").innerHTML =
    '<option value="all">All</option>';
  const arr = products.map((product) => product.productId);
  arr.forEach((Id) => {
    document
      .querySelector("#selectId")
      .insertAdjacentHTML("beforeend", `<option value=${Id}>${Id}</option>`);
  });
}

function rendarProducts(Currentproducts) {
  document.querySelector(".table").innerHTML = ``;
  Currentproducts.forEach((product) => {
    rendar(product);
  });
}
renderOptions();
rendarProducts(products);
createProductBtn.addEventListener("click", () => {
  window.location.replace("/createProduct.html");
});

function getData() {
  const productId = document.querySelector("#product--id").value;
  const productName = document.querySelector("#product--name").value;
  const productImageSrc = document.querySelector("#product--url").value;
  const productPrice = document.querySelector("#product--price").value;
  const productDesc = document.querySelector("#product--Description").value;
  return { productId, productName, productImageSrc, productPrice, productDesc };
}

function deleteProduct(id) {
  products = products.filter((product) => product.productId != id);
  window.localStorage.setItem("products", JSON.stringify(products));
  renderOptions();
  rendarProducts(products);
}
function editProduct(id) {
  window.location.replace(`/editProduct.html?id=${id}`);
}
function viewProduct(id) {
  window.location.replace(`/viewProduct.html?id=${id}`);
}

function sortProducts(sortBy, type) {
  let tempsort;
  if (type === "asc") {
    switch (sortBy) {
      case "Product Id":
        tempsort = [...products].sort((a, b) => a.productId - b.productId);
        break;
      case "Product Name":
        tempsort = [...products].sort((a, b) =>
          a.productName.localeCompare(b.productName)
        );
        break;
      case "Price":
        tempsort = [...products].sort(
          (a, b) => a.productPrice - b.productPrice
        );
        break;
    }
  } else if (type === "desc") {
    switch (sortBy) {
      case "Product Id":
        tempsort = [...products].sort((a, b) => b.productId - a.productId);
        break;
      case "Product Name":
        tempsort = [...products].sort((a, b) =>
          b.productName.localeCompare(a.productName)
        );
        break;
      case "Price":
        tempsort = [...products].sort(
          (a, b) => b.productPrice - a.productPrice
        );
        break;
    }
  }
  rendarProducts(tempsort);
}

tableHeader.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("sortable") &&
    (e.target.classList.contains("asc") || e.target.classList.contains("desc"))
  ) {
    if (e.target.classList.contains("asc")) {
      e.target.classList.remove("asc");
      e.target.classList.add("desc");
      e.target.innerHTML = e.target.dataset["desc"];
      sortProducts(e.target.dataset["original"], "desc");
    } else {
      e.target.classList.remove("desc");
      e.target.classList.add("asc");
      e.target.innerHTML = e.target.dataset["asc"];
      sortProducts(e.target.dataset["original"], "asc");
    }
  } else if (e.target.classList.contains("sortable")) {
    const allSortable = e.target
      .closest(".header")
      .querySelectorAll(".sortable");
    allSortable.forEach((e) => {
      e.classList.remove("asc");
      e.classList.remove("desc");
      e.innerHTML = e.dataset["original"];
    });
    e.target.classList.add("asc");
    e.target.innerHTML = e.target.dataset["asc"];
    sortProducts(e.target.dataset["original"], "asc");
  }
});
selectId.addEventListener("change", () => {
  console.log(selectId.value);
  if (selectId.value == "all") {
    rendarProducts(products);
  } else {
    tempproduct = [...products].filter(
      (product) => product.productId === Number(selectId.value)
    );
    rendarProducts(tempproduct);
  }
});
search.addEventListener("keyup", () => {
  tempproduct = [...products].filter((product) =>
    product.productName.toLowerCase().includes(search.value.toLowerCase())
  );
  rendarProducts(tempproduct);
});

"use-strict";
const table = document.querySelector(".table");
const createProductBtn = document.querySelector(".cProduct");
const createProduct = document.querySelector(".createProduct");
const modal = document.querySelector(".modal--createProduct");
const btns = document.querySelector(".button--wrapper");
const overlay = document.querySelector(".overlay");
let products = JSON.parse(window.localStorage.getItem("products")) || [];
const rendar = ({
  productId,
  productName,
  productImageSrc,
  productPrice,
  productDesc,
}) => {
  var html = `<tr>
    <td>${productId}</td>
    <td>${productName}</td>
    <td>
        <img src="${productImageSrc}"/>
    </td>
    <td>${productPrice}$</td>
    <td>${productDesc}</td>
    <td class="accessibility">
      <button class="btn view" onClick="viewProduct(${productId})">View</button>
      <button class="btn edit" onClick="editProduct(${productId})">Edit</button>
      <button class="btn delete" onClick="deleteProduct(${productId})">Delete</button>
    </td>
  </tr>`;
  document.querySelector(".table").insertAdjacentHTML("beforeend", html);
};
function rendarProducts(products) {
  document.querySelector(".table").innerHTML = `
  <tr>
    <th>Product Id</th>
    <th>Product Name</th>
    <th>Image</th>
    <th>Price</th>
    <th>Description</th>
    <th>accessibility</th>
  </tr>
  `;
  products.forEach((product) => {
    rendar(product);
  });
}
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
      case "productId":
        tempsort = [...products].sort((a, b) => a.productId - b.productId);
        break;
      case "productName":
        tempsort = [...products].sort((a, b) =>
          a.productName.localeCompare(b.productName)
        );
        break;
      case "productPrice":
        tempsort = [...products].sort(
          (a, b) => a.productPrice - b.productPrice
        );
        break;
    }
  } else if (type === "dsc") {
    switch (sortBy) {
      case "productId":
        tempsort = [...products].sort((a, b) => b.productId - a.productId);
        break;
      case "productName":
        tempsort = [...products].sort((a, b) =>
          b.productName.localeCompare(a.productName)
        );
        break;
      case "productPrice":
        tempsort = [...products].sort(
          (a, b) => b.productPrice - a.productPrice
        );
        break;
    }
  }
  rendarProducts(tempsort);
}

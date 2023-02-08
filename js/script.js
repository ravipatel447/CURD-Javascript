"use-strict";
const table = document.querySelector(".table");
const createProductBtn = document.querySelector(".cProduct");
const createProduct = document.querySelector(".createProduct");
const modal = document.querySelector(".modal--createProduct");
const btns = document.querySelector(".button--wrapper");
const overlay = document.querySelector(".overlay");
let products = JSON.parse(window.localStorage.getItem("products"));
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
function rendarProducts() {
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
rendarProducts();
createProductBtn.addEventListener("click", () => {
  // console.log(window.location);
  window.location.replace("/createProduct.html");
});
// btns.addEventListener("click", (e) => {
//   e.preventDefault();
//   if (e.target.classList.contains("cancel")) {
//     modal.style.display = "none";
//   } else if (e.target.classList.contains("submit")) {
//     const product = getData();
//     products.push(product);
//     rendarProducts();
//     modal.style.display = "none";
//   }
// });

function getData() {
  const productId = document.querySelector("#product--id").value;
  const productName = document.querySelector("#product--name").value;
  const productImageSrc = document.querySelector("#product--url").value;
  const productPrice = document.querySelector("#product--price").value;
  const productDesc = document.querySelector("#product--Description").value;
  return { productId, productName, productImageSrc, productPrice, productDesc };
}

// createProduct.addEventListener("click", (e) => {
//   e.stopPropagation();
// });
// overlay.addEventListener("click", () => {
//   modal.style.display = "none";
// });

function deleteProduct(id) {
  console.log(id);
  products = products.filter((product) => product.productId != id);
  window.localStorage.setItem("products", JSON.stringify(products));
  rendarProducts();
}
function editProduct(id) {
  window.location.replace(`/editProduct.html?id=${id}`);
}
function viewProduct(id) {
  window.location.replace(`/viewProduct.html?id=${id}`);
}

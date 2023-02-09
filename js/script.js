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

///////////////////////////////////rendering one row in table////////////////////////////////////
const renderRow = ({
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
//////////////////////////////////rendring options of select elements////////////////////////////////
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
////////////////////////////////// rendering all products in table////////////////////////////////////
function renderProducts(Currentproducts) {
  document.querySelector(".table").innerHTML = ``; // set table to "" (for reseting)
  Currentproducts.forEach((product) => {
    renderRow(product); //render by each row
  });
}
renderOptions(); // first time rendering options
renderProducts(products); // first time rendering products

/////////////////////////////// redirecting to createproduct.html ///////////////////////////////////
createProductBtn.addEventListener("click", () => {
  window.location.replace("/createProduct.html");
});

//////////////////////////////// deleting one product by id //////////////////////////////////////////
function deleteProduct(id) {
  if (window.confirm(`Are you sure you want to delete product Id ${id}`)) {
    products = products.filter((product) => product.productId != id);
    window.localStorage.setItem("products", JSON.stringify(products)); // updating product in local storage
    renderOptions(); // after updating product rerender optins of select tag
    renderProducts(products); // rerender products
  }
}
/////////////////////////////// redirecting to editProduct.html ///////////////////////////////////
function editProduct(id) {
  window.location.replace(`/editProduct.html?id=${id}`);
}
/////////////////////////////// redirecting to viewProduct.html ///////////////////////////////////
function viewProduct(id) {
  window.location.replace(`/viewProduct.html?id=${id}`);
}
/// sorting all products by (product id,product name and price) and type(asending or desending) ///
function sortProducts(sortBy, type) {
  let tempsort;
  //sort is by asending order
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
    //sort is by desending order
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
  renderProducts(tempsort);
}
////////////////////////// setting sorting functionality with table header/////////////////
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
////////////////////////// filter by id using select tag////////////////////
selectId.addEventListener("change", () => {
  console.log(selectId.value);
  if (selectId.value == "all") {
    renderProducts(products);
  } else {
    tempproduct = [...products].filter(
      (product) => product.productId === Number(selectId.value)
    );
    renderProducts(tempproduct);
  }
});
////////////////////////// searching functionality ////////////////////////
search.addEventListener("keyup", () => {
  tempproduct = [...products].filter((product) =>
    product.productName.toLowerCase().includes(search.value.toLowerCase())
  );
  renderProducts(tempproduct);
});

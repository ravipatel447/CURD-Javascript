const createProductBtn = document.querySelector(".cProduct");
const createProduct = document.querySelector(".createProduct");
const modal = document.querySelector(".modal--createProduct");
const btns = document.querySelector(".button--wrapper");
const overlay = document.querySelector(".overlay");

function setData({
  productId,
  productName,
  productImageSrc,
  productPrice,
  productDesc,
}) {
  document.querySelector("#product--id").value = productId;
  document.querySelector("#product--name").value = productName;
  document.querySelector("#product--img").src = productImageSrc;
  document.querySelector("#product--price").value = productPrice;
  document.querySelector("#product--Description").value = productDesc;
}
const products = JSON.parse(window.localStorage.getItem("products")) || [];
let [, pId] = window.location.search.split("=");
pId = Number(pId);
const [product] = products.filter((product) => product.productId === pId);
setData(product);

btns.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("submit")) {
    window.location.replace("/index.html");
  }
});

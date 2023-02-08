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
  document.querySelector("#product--url").value = productImageSrc;
  document.querySelector("#product--price").value = productPrice;
  document.querySelector("#product--Description").value = productDesc;
}
function getData() {
  const productId = document.querySelector("#product--id").value;
  const productName = document.querySelector("#product--name").value;
  const productImageSrc = document.querySelector("#product--url").value;
  const productPrice = document.querySelector("#product--price").value;
  const productDesc = document.querySelector("#product--Description").value;
  return { productId, productName, productImageSrc, productPrice, productDesc };
}
const products = JSON.parse(window.localStorage.getItem("products"));
let [, pId] = window.location.search.split("=");
pId = Number(pId);
const [product] = products.filter((product) => product.productId === pId);
setData(product);

btns.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("cancel")) {
    window.location.replace("/index.html");
  } else if (e.target.classList.contains("submit")) {
    const product = getData();
    let abc = products.find((product) => product.productId === pId);
    abc.productId = Number(product.productId);
    abc.productImageSrc = product.productImageSrc;
    abc.productName = product.productName;
    abc.productPrice = Number(product.productPrice);
    abc.productDesc = product.productDesc;
    window.localStorage.setItem("products", JSON.stringify(products));
    window.location.replace("/index.html");
  }
});

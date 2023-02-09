const createProductBtn = document.querySelector(".cProduct");
const createProduct = document.querySelector(".createProduct");
const modal = document.querySelector(".modal--createProduct");
const btns = document.querySelector(".button--wrapper");
const overlay = document.querySelector(".overlay");
const product__name = document.querySelector("#product--name");
const product__url = document.querySelector("#product--url");
const product__price = document.querySelector("#product--price");
const product__description = document.querySelector("#product--Description");

////////////////////////////// set product data in form ////////////////////////////
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
////////////////////////////// get product data for submiting form ////////////////////////////
function getData() {
  const productId = document.querySelector("#product--id").value;
  const productName = product__name.value;
  const productImageSrc = product__url.value;
  const productPrice = parseInt(product__price.value);
  const productDesc = product__description.value;
  return { productId, productName, productImageSrc, productPrice, productDesc };
}
////////////////////////////// checking product information validity for form  ////////////////////////////
function checkvalidity() {
  if (!product__name.checkValidity()) {
    product__name.reportValidity();
  } else if (!product__url.checkValidity()) {
    product__url.reportValidity();
  } else if (!product__price.checkValidity()) {
    product__price.reportValidity();
  } else if (!product__description.checkValidity()) {
    product__description.reportValidity();
  } else {
    return true;
  }
  return false;
}
////////////////////////////// fetch product form URL ///////////////////////////////////////
const products = JSON.parse(window.localStorage.getItem("products")) || [];
let [, pId] = window.location.search.split("=");
pId = Number(pId);
const [product] = products.filter((product) => product.productId === pId);
setData(product); //set data for form

////////////////////////////// submit handler ///////////////////////////////////////////////
btns.addEventListener("click", (e) => {
  const a = checkvalidity(); // checking validity
  e.preventDefault();
  if (e.target.classList.contains("cancel")) {
    // pressing cancel button
    window.location.replace("/index.html");
  } else if (e.target.classList.contains("submit")) {
    // pressing submit button
    if (!a) return; // return if form validation is false
    const product = getData(); // get product details
    let abc = products.find((product) => product.productId === pId);
    abc.productId = Number(product.productId);
    abc.productImageSrc = product.productImageSrc;
    abc.productName = product.productName;
    abc.productPrice = Number(product.productPrice);
    abc.productDesc = product.productDesc;
    window.localStorage.setItem("products", JSON.stringify(products)); // storing it to localstorage
    window.location.replace("/index.html"); // change page
  }
});

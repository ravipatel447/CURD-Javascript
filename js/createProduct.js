const createProductBtn = document.querySelector(".cProduct");
const createProduct = document.querySelector(".createProduct");
const modal = document.querySelector(".modal--createProduct");
const btns = document.querySelector(".button--wrapper");
const overlay = document.querySelector(".overlay");
const product__name = document.querySelector("#product--name");
const product__url = document.querySelector("#product--url");
const product__price = document.querySelector("#product--price");
const product__description = document.querySelector("#product--Description");
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
function getData() {
  let pid = +(window.localStorage.getItem("product__id") || 0) + 1;
  window.localStorage.setItem("product__id", pid);
  const productId = parseInt(pid);
  // const productId = parseInt(document.querySelector("#product--id").value);    #this is for manual product id
  const productName = product__name.value;
  const productImageSrc = product__url.value;
  const productPrice = parseInt(product__price.value);
  const productDesc = product__description.value;
  return { productId, productName, productImageSrc, productPrice, productDesc };
}
btns.addEventListener("click", (e) => {
  const a = checkvalidity();
  e.preventDefault();
  if (e.target.classList.contains("cancel")) {
    window.location.replace("/index.html");
  } else if (e.target.classList.contains("submit")) {
    if (!a) return;
    const product = getData();
    const currentProducts =
      JSON.parse(window.localStorage.getItem("products")) || [];
    currentProducts.push(product);
    window.localStorage.setItem("products", JSON.stringify(currentProducts));
    window.location.replace("/index.html");
  }
});

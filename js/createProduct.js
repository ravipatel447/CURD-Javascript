const createProductBtn = document.querySelector(".cProduct");
const createProduct = document.querySelector(".createProduct");
const modal = document.querySelector(".modal--createProduct");
const btns = document.querySelector(".button--wrapper");
const overlay = document.querySelector(".overlay");
const product__name = document.querySelector("#product--name");
const product__url = document.querySelector("#product--url");
const product__price = document.querySelector("#product--price");
const product__description = document.querySelector("#product--Description");

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

////////////////////////////// get product data for submiting form ////////////////////////////
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

////////////////////////////// submit handler ///////////////////////////////////////////////
btns.addEventListener("click", (e) => {
  const a = checkvalidity(); //checking validity
  e.preventDefault();
  if (e.target.classList.contains("cancel")) {
    // cancel button pressed
    window.location.replace("/index.html"); // change page
  } else if (e.target.classList.contains("submit")) {
    if (!a) return; // return if form validation is false
    const product = getData();
    const currentProducts =
      JSON.parse(window.localStorage.getItem("products")) || []; // fetching current products
    currentProducts.push(product); // add current product
    window.localStorage.setItem("products", JSON.stringify(currentProducts)); // set all products to local storage
    window.location.replace("/index.html"); // change page
  }
});

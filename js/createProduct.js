const createProductBtn = document.querySelector(".cProduct");
const createProduct = document.querySelector(".createProduct");
const modal = document.querySelector(".modal--createProduct");
const btns = document.querySelector(".button--wrapper");
const overlay = document.querySelector(".overlay");

function getData() {
  const productId = parseInt(document.querySelector("#product--id").value);
  const productName = document.querySelector("#product--name").value;
  const productImageSrc = document.querySelector("#product--url").value;
  const productPrice = parseInt(
    document.querySelector("#product--price").value
  );
  const productDesc = document.querySelector("#product--Description").value;
  return { productId, productName, productImageSrc, productPrice, productDesc };
}
btns.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("cancel")) {
    window.location.replace("/index.html");
  } else if (e.target.classList.contains("submit")) {
    const product = getData();
    const currentProducts = JSON.parse(window.localStorage.getItem("products"));
    currentProducts.push(product);
    window.localStorage.setItem("products", JSON.stringify(currentProducts));
    window.location.replace("/index.html");
  }
});

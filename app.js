import { productsData } from "./products.js";

const cartBtn = document.querySelector(".cartBtn");
const cartModal = document.querySelector(".cartModal");
const backDrop = document.querySelector(".backDrop");
const confirmModalBtn = document.querySelector(".confirmModalBtn");

class Products {
  getProduct() {
    return productsData;
  }
}

class UI {}

class Storage {}

document.addEventListener("DOMContentLoaded", () => {
  const product = new Products();
  const productsData = product.getProduct();
  console.log(productsData);
});

function showModalFunction() {
  backDrop.style.display = "block";
  cartModal.style.opacity = "1";
  cartModal.style.top = "20%";
}
function closeModalFunction() {
  backDrop.style.display = "none";
  cartModal.style.opacity = "1";
  cartModal.style.top = "-100%";
}

cartBtn.addEventListener("click", showModalFunction);
confirmModalBtn.addEventListener("click", closeModalFunction);
backDrop.addEventListener("click", closeModalFunction);

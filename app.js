import { productsData } from "./products.js";

const cartBtn = document.querySelector(".cartBtn");
const cartModal = document.querySelector(".cartModal");
const backDrop = document.querySelector(".backDrop");
const confirmModalBtn = document.querySelector(".confirmModalBtn");

const productsDOM = document.querySelector(".productsCenter");

class Products {
  getProduct() {
    return productsData;
  }
}

class UI {
  displayProducts(products) {
    let result = "";
    products.forEach((item) => {
      result += `
        <div class="product">
        <div class="productImg">
          <img src="${item.imageUrl}" alt="" />
        </div>
        <div class="productDesc">
          <p class="productPrice">$ ${item.price}</p>
          <p class="productTitle">${item.title}</p>
        </div>
        <div class="productBtnDiv">
          <button class="btn productBtn" data-id=${item.id}>Add to cart</button>
        </div>
      </div>
        `;
      productsDOM.innerHTML = result;
    });
  }
  getAddToCartBtns() {
    const productBtns = document.querySelectorAll(".productBtn");
    const buttons = [...productBtns];
  }
}

class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const product = new Products();
  const productsData = product.getProduct();
  const ui = new UI();
  ui.displayProducts(productsData);
  console.log(productsData);
  ui.getAddToCartBtns();
  Storage.saveProducts(productsData);
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

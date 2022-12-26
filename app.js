import { productsData } from "./products.js";

const cartBtn = document.querySelector(".cartBtn");
const cartModal = document.querySelector(".cartModal");
const backDrop = document.querySelector(".backDrop");
const confirmModalBtn = document.querySelector(".confirmModalBtn");

const productsDOM = document.querySelector(".productsCenter");

let cart = [];

// Product receiving class
class Products {
  getProduct() {
    return productsData;
  }
}

// display products Class
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

  // Get the desired product ID
  getAddToCartBtns() {
    const productBtns = document.querySelectorAll(".productBtn");
    const buttons = [...productBtns];

    buttons.forEach((btn) => {
      const id = btn.dataset.id;
      const isInCart = cart.find((p) => p.id === id);
      //   If there is a product in the shopping cart
      if (isInCart) {
        btn.innerHTML = `<i class="fa-solid fa-check"></i>`;
        btn.disable = true;
      }
      //   If the add to cart button is clicked
      btn.addEventListener("click", (event) => {
        event.target.innerHTML = `<i class="fa-solid fa-check"></i>`;
        btn.disable = true;

        // get id product
        const addedProduct = Storage.getProduct(id);
        // Assigning a value of one to the product in the shopping cart
        cart = [...cart, { ...addedProduct, quantity: 1 }];
        console.log(cart);
        // update local
        Storage.saveCart(cart);
      });
    });
  }
}

// local storage class
class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
  //   Receive products from local
  static getProduct(id) {
    const products = JSON.parse(localStorage.getItem("products"));
    // Find the desired ID in local products
    return products.find((p) => p.id === parseInt(id));
  }
  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
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

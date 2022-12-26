import { productsData } from "./products.js";

const cartBtn = document.querySelector(".cartBtn");
const cartModal = document.querySelector(".cartModal");
const backDrop = document.querySelector(".backDrop");
const confirmModalBtn = document.querySelector(".confirmModalBtn");

const productsDOM = document.querySelector(".productsCenter");
const cartTotal = document.querySelector(".cartTotal");
const cartItems = document.querySelector(".cartItems");
const cartContent = document.querySelector(".cartContent");
const clearModalBtn = document.querySelector(".clearModalBtn");

let cart = [];

let buttonDOM = [];

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
    // get all buttons
    const productBtns = [...document.querySelectorAll(".productBtn")];
    buttonDOM = productBtns;

    productBtns.forEach((btn) => {
      const id = btn.dataset.id;

      const isInCart = cart.find((p) => p.id === parseInt(id));
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
        const addedProduct = { ...Storage.getProduct(id), quantity: 1 };
        // Assigning a value of one to the product in the shopping cart
        cart = [...cart, addedProduct];
        console.log(cart);
        // update local
        Storage.saveCart(cart);
        // Enter the shopping cart amount
        this.setCartValue(cart);
        // Passing data to the shopping cart
        this.addCartItem(addedProduct);
      });
    });
  }
  // Update the price and amount of the shopping cart
  setCartValue(cart) {
    let tempCartItem = 0;
    const totalPrice = cart.reduce((acc, curr) => {
      tempCartItem += curr.quantity;
      return acc + curr.quantity * curr.price;
    }, 0);
    //   The total amount of the shopping cart
    cartTotal.innerText = `Total price : ${totalPrice.toFixed(2)} $`;
    //   Set the number of products in the shopping cart
    cartItems.innerHTML = tempCartItem;
  }

  // Shopping cart structure
  addCartItem(cartItem) {
    const div = document.createElement("div");
    div.classList.add("cartItem");
    div.innerHTML = `
    <img
      class="cartImg"
      src="${cartItem.imageUrl}"
      alt=""
    />
    <div class="cartItemDesc">
      <p>${cartItem.title}</p>
      <h5>$ ${cartItem.price}</h5>
    </div>
    <div class="cartItemController">
      <i class="fas fa-chevron-up" data-id=${cartItem.id}></i>
      <p>${cartItem.quantity}</p>
      <i class="fas fa-chevron-down"data-id=${cartItem.id}></i>
    </div>
    <i class="fas fa-trash removeItem" data-id=${cartItem.id}></i>`;
    cartContent.appendChild(div);
  }

  // Update shopping cart
  setupApp() {
    // get cart from storage
    cart = Storage.getCart() || [];
    // add cartItem in storage
    cart.forEach((cartItem) => this.addCartItem(cartItem));
    // set value : price + item
    this.setCartValue(cart);
  }

  cartLogic() {
    clearModalBtn.addEventListener("click", () => this.clearCart());

    // Add product amount to cart
    cartContent.addEventListener("click", (event) => {
      if (event.target.classList.contains("fa-chevron-up")) {
        const addQuantity = event.target;
        // get item from cart
        const addedItem = cart.find(
          (cItem) => cItem.id == addQuantity.dataset.id,
        );
        addedItem.quantity++;
        // update cart value
        this.setCartValue(cart);
        // save cart
        Storage.saveCart(cart);
        addQuantity.nextElementSibling.innerText = addedItem.quantity;
      } else if (event.target.classList.contains("fa-trash")) {
        const removeItem = event.target;
        const _removeItem = cart.find((c) => c.id == removeItem.dataset.id);
        this.removeItem(_removeItem.id);
        // update cart storage
        Storage.saveCart(cart);
        cartContent.removeChild(removeItem.parentElement);
      }
    });
  }

  //   Handler to clear cart products
  clearCart() {
    cart.forEach((cItem) => this.removeItem(cItem.id));

    while (cartContent.children.length) {
      cartContent.removeChild(cartContent.children[0]);
    }
    closeModalFunction();
  }

  //  handler remove item
  removeItem(id) {
    cart = cart.filter((cItem) => cItem.id !== id);
    this.setCartValue(cart);
    Storage.saveCart(cart);

    this.getSingleButton(id);
  }

  //   update text and disable product
  getSingleButton(id) {
    const button = buttonDOM.find(
      (btn) => parseInt(btn.dataset.id) === parseInt(id),
    );
    button.innerText = "Add to cart";
    buttonDOM.disable = false;
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
  //   Save shopping cart
  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  static getCart() {
    return JSON.parse(localStorage.getItem("cart"));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const product = new Products();
  const productsData = product.getProduct();
  const ui = new UI();
  ui.setupApp();
  ui.displayProducts(productsData);
  ui.getAddToCartBtns();
  ui.cartLogic();
  Storage.saveProducts(productsData);
});

// shopping cart modal
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

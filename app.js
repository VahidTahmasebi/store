const cartBtn = document.querySelector(".cartBtn");
const cartModal = document.querySelector(".cartModal");
const backDrop = document.querySelector(".backDrop");
const confirmModalBtn = document.querySelector(".confirmModalBtn");

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

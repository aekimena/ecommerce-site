import { products } from "./products.js";

let productDisplay = document.querySelector('.products-sec');
let cart = [];
let cartNumber = document.querySelector('.cart-number');

function displayProducts(){
    products.forEach(product => {
      let productsToShow = document.createElement('div');
      productsToShow.classList.add('product', 'col-xl-3', 'col-lg-3', 'col-md-4', 'col-sm-6', 'col-xs-12');
      productsToShow.innerHTML = `<div class="card">
          <img src="${product.image}" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">${product.nameOfProduct}</h5>
            <p class="h4 card-text">${product.price}</p>
            <a href="#" class="addCartBtn btn btn-primary">Add to cart</a>
          </div>
        </div>`;
      productDisplay.appendChild(productsToShow);
    })
}
displayProducts();

function addToCart(){
  let addCartBtn = document.querySelectorAll('.addCartBtn');
  let btnArray = Array.from(addCartBtn);
  addCartBtn.forEach(btn => {
    btn.addEventListener('click', () =>{
      if(btn.innerHTML == 'Added'){
        cart.splice(cart.indexOf(btn), 1)
        cartNumber.innerHTML = cart.length;
        btn.innerHTML = 'Add to cart';
        updateCartItems();
      }else {
        cart.push(products[btnArray.indexOf(btn)]);
        cartNumber.innerHTML = cart.length;
        btn.innerHTML = 'Added';
        updateCartItems();
      }
    })
  })
}
addToCart();

function showCart(){
  document.addEventListener('click', (event) => {
    let cartSideBar = document.getElementById('checkout-sidebar');
    let cartIcon = document.getElementById('cart-display');
    if(event.target === cartIcon){
      cartSideBar.style.width = cartSideBar.style.width === '0px' ? '500px' : '0px';
    } else {
      if(!cartSideBar.contains(event.target)){
        cartSideBar.style.width = '0px';
      }
    }
  })
}
showCart();

function updateCartItems(){
  let cartItems = document.querySelector('.cart-items');
  while (cartItems.firstChild){
    cartItems.removeChild(cartItems.firstChild);
  }

  cart.forEach(cart => {
    let cartsToShow = document.createElement('div');
    cartsToShow.classList.add('row', 'g-3', 'd-flex', 'align-items-center');
    cartsToShow.innerHTML = `<div class="col-3 cart-images">
    <img src="${cart.image}" class="img-fluid" alt="" />
  </div>
  <div class="col-3 cart-titles">
    <p class="h6">${cart.nameOfProduct}</p>
  </div>
  <div class="col-3 cart-price">
    <p class="h6">${cart.price}</p>
  </div>
  <div
    class="col-3 d-flex justify-content-between align-items-center"
  >
    <h5><i class="addItemBtn fa-solid fa-plus"></i></h5>
    <div
      class="quantity-display text-dark d-flex justify-content-center align-items-center"
    >
      1
    </div>
    <h5><i class="minusItemBtn fa-solid fa-minus"></i></h5>
  </div>
  <hr style="display: block; background-color: #fff; height: 1px" />`;
    cartItems.appendChild(cartsToShow);
  })
}
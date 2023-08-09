import { Realproducts } from "./products.js";

let products = Realproducts;

let productDisplay = document.querySelector('.products-sec');
let cart = [];
let cartNumber = document.querySelector('.cart-number');
let added = '<i class="fa-solid fa-cart-shopping"></i> Added';
let notAdded = '<i class="fa-solid fa-cart-shopping"></i> Add To Cart';
let filterProduct = products;
let newFilterProduct = products;

function displayProducts(productArray){
  // let cartItems = document.querySelector('.cart-items');
  while (productDisplay.firstChild){
    productDisplay.removeChild(productDisplay.firstChild);
  }
  productArray.forEach(product => {
      let productsToShow = document.createElement('div');
      productsToShow.classList.add('product', 'col-xl-3', 'col-lg-3', 'col-md-6', 'col-sm-6', 'col-xs-6');
      productsToShow.innerHTML = `<div class="card" style="height: 100%;">
          <img src="${product.image}" class="card-img-top p-3" alt="..."/>
          <hr>
          <div class="card-body">
            <h5 class="card-title">${product.nameOfProduct}</h5>
            <p class="h4 card-text">$${product.price.toFixed(2)}</p>
            <button  class="addCartBtn btn btn-dark">${notAdded}</button>
          </div>
        </div>`;
      productDisplay.appendChild(productsToShow);
    })
    addToCart(productArray);
}
displayProducts(products);

function addToCart(productArray){
  let addCartBtn = document.querySelectorAll('.addCartBtn');
  let btnArray = Array.from(addCartBtn);
  for(let i of productArray){
    for(let j of cart){
      if(i.id == j.id){
        addCartBtn[productArray.indexOf(i)].innerHTML = added;
      }
    }
  }
  addCartBtn.forEach(btn => {
    btn.addEventListener('click', () =>{
      console.log('yes')
      if(btn.innerHTML == added){
        for(let i of cart){
          if(i.id === productArray[btnArray.indexOf(btn)].id){
            cart.splice(cart.indexOf(i), 1)
          }
        }
        // cart.splice(cart.indexOf(btn), 1)
        cartNumber.innerHTML = cart.length;
        btn.innerHTML = notAdded;
        updateCartItems();
      }else {
        cart.push(productArray[btnArray.indexOf(btn)]);
        cartNumber.innerHTML = cart.length;
        btn.innerHTML = added;
        updateCartItems();
      }
    })
  })
}
// addToCart();

function showCart(){
  document.addEventListener('click', (event) => {
    let cartSideBar = document.getElementById('checkout-sidebar');
    let cartIcon = document.getElementById('cart-display');
    if(event.target === cartIcon){
      cartSideBar.style.width = cartSideBar.style.width === '0px' ? '90%' : '0px';
    } else {
      if(!cartSideBar.contains(event.target)){
        cartSideBar.style.width = '0px';
      }
    }
    document.querySelector('.hide-cart').addEventListener('click', () => {
      cartSideBar.style.width = '0px';
    })
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
    cartsToShow.innerHTML = `<div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12 cart-images">
    <img src="${cart.image}" class="img-fluid" alt="" />
    <p class="h6 trash pt-2">Remove <i class="fa-solid fa-trash"></i></p>
  </div>
  <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12 cart-titles">
    <p class="h6">${cart.nameOfProduct}</p>
  </div>
  <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12">
    <p class="h5 cart-price">$${cart.price.toFixed(2)}</p>
  </div>
  <div
    class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12 d-flex gap-2  align-items-center"
  >
    <button class="addItemBtn"><h4><i class="fa-solid fa-plus"></i></h4></button>
    <div
      class="quantity-display text-dark d-flex justify-content-center align-items-center h4"
    >
      1
    </div>
    <button class="minusItemBtn"><h4><i class="fa-solid fa-minus"></i></h4></button>
  </div>
  <hr style="display: block; background-color: #fff; height: 1px" />`;
    cartItems.appendChild(cartsToShow);
  })
  addminus();
  displayTotal();
  removecart();
}

function removecart(){
  console.log(cart);
  let addCartBtn = document.querySelectorAll('.addCartBtn');
  let btnArray = Array.from(addCartBtn);
  let trash = document.querySelectorAll('.trash');
  let trashArray = Array.from(trash);
  trash.forEach(trash => {
    document.addEventListener('click', (event) => {
      if(event.target === trash){
        for(let i of products){
          if(i.id === cart[trashArray.indexOf(trash)].id){
            addCartBtn[products.indexOf(i)].innerHTML = notAdded;
          }
        }
        cart.splice(trashArray.indexOf(trash), 1);
        updateCartItems();
        displayTotal();
        cartNumber.innerHTML = cart.length;
      }
    })
  })
}
// removecart();

function addminus(){
  let addQIcon = document.querySelectorAll('.addItemBtn');
  let minusQIcon = document.querySelectorAll('.minusItemBtn');
  let price = document.querySelectorAll('.cart-price');
  let quantityDisplay = document.querySelectorAll('.quantity-display');
  let cartArray = Array.from(addQIcon);
  let cartArray2 = Array.from(minusQIcon);

  addQIcon.forEach(addIcon => {
    let x = cart[cartArray.indexOf(addIcon)].price;
    addIcon.addEventListener('click', () => {
      let count = parseInt(quantityDisplay[cartArray.indexOf(addIcon)].textContent);
      if(count == cart[cartArray.indexOf(addIcon)].stock){
        addIcon.classList.add('disabled')
      } else {
        count++;
        cart[cartArray.indexOf(addIcon)].price = cart[cartArray.indexOf(addIcon)].price + x;
        price[cartArray.indexOf(addIcon)].innerHTML = `$${cart[cartArray.indexOf(addIcon)].price.toFixed(2)}`;
        quantityDisplay[cartArray.indexOf(addIcon)].textContent = count;
        displayTotal();
      }
    })
  })

  minusQIcon.forEach(minusIcon => {
    let y = cart[cartArray2.indexOf(minusIcon)].price;
    minusIcon.addEventListener('click', () => {
      let count = parseInt(quantityDisplay[cartArray2.indexOf(minusIcon)].textContent);
      if(count == 1){
        minusIcon.classList.add('disabled')
      } else {
        count--;
        cart[cartArray2.indexOf(minusIcon)].price = cart[cartArray2.indexOf(minusIcon)].price - y;
        price[cartArray2.indexOf(minusIcon)].innerHTML = `$${cart[cartArray2.indexOf(minusIcon)].price.toFixed(2)}`;
        quantityDisplay[cartArray2.indexOf(minusIcon)].textContent = count;
        displayTotal();
      }
    })
  })
}


function displayTotal(){
  let allPrice = document.querySelectorAll('.cart-price');
  let priceArray = Array.from(allPrice);
  priceArray = priceArray.map(x => x.innerHTML.slice(1)).map(y => parseInt(y));
  let sum = priceArray.reduce((x, y) => x + y, 0);
  document.querySelector('.total').innerHTML = `$${sum.toFixed(2)}`;
}

let categoryArray = [''];
let productArray = [''];

function filter(){
  let productBtns = document.querySelectorAll('.filter-btns button');
  let filterBtns = document.querySelectorAll('.filterli li');
  let allFilter = true;
  let allCategory = true;
  productBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.add('active');
      let sibllings = Array.from(btn.parentNode.children);
      let filteredSiblings = sibllings.filter((element) => {
          return element !== btn;
      })
      filteredSiblings.forEach(unwantedList => {
          unwantedList.classList.remove('active');
      })
      if(btn.innerHTML.toLowerCase() == 'all' && allFilter){
        allCategory = true;
        displayProducts(products);
      } else if(btn.innerHTML.toLowerCase() !== 'all' && !allFilter) {
        allCategory = false;
        productArray[0] = btn.innerHTML.toLowerCase();
        displayProducts(products.filter(product => product.product == btn.innerHTML.toLowerCase() && product.category == categoryArray[0]));
      }
       else if(btn.innerHTML.toLowerCase() !== 'all' && allFilter) {
        allCategory = false;
        productArray[0] = btn.innerHTML.toLowerCase();
        displayProducts(products.filter(product => product.product == btn.innerHTML.toLowerCase()));
      }else if(btn.innerHTML.toLowerCase() == 'all' && !allFilter){
        allCategory = true;
        displayProducts(products.filter(product => product.category == categoryArray[0]));
      }
      sortArray = products;
    })
  })

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.add('active');
      let sibllings = Array.from(btn.parentNode.children);
      let filteredSiblings = sibllings.filter((element) => {
          return element !== btn;
      })
      filteredSiblings.forEach(unwantedList => {
          unwantedList.classList.remove('active');
      })
      if(btn.innerHTML.toLowerCase() == 'all' && allCategory){
        allFilter = true;
        displayProducts(products);
      } else if(btn.innerHTML.toLowerCase() !== 'all' && !allCategory) {
        allFilter = false;
        categoryArray[0] = btn.innerHTML.toLowerCase();
        displayProducts(products.filter(product => product.category == btn.innerHTML.toLowerCase() && product.product == productArray[0]));
      }
      else if(btn.innerHTML.toLowerCase() !== 'all' && allCategory){
        allFilter = false;
        categoryArray[0] = btn.innerHTML.toLowerCase();
        displayProducts(products.filter(product => product.category == btn.innerHTML.toLowerCase()));
      } else if(btn.innerHTML.toLowerCase() == 'all' && !allCategory){
        allFilter = true;
        displayProducts(products.filter(product => product.product == productArray[0]));
      }
      sortArray = products;
    })
  })
}

filter();

const searchBox = document.querySelector('.search-field');

function searchProducts(){
  searchBox.addEventListener('focus', () => {
    document.addEventListener('keyup', checkKeyPressed)
  });

  document.querySelector('.search-btn').addEventListener('click', () => {
    checkKeyPressed();
  })
}
searchProducts();

function checkKeyPressed(event){
    if(event.keyCode){
      const target = searchBox.value.toLowerCase();

      displayProducts(products.filter(product => product.nameOfProduct.toLowerCase().includes(target)))
        
      if(target.length == 0){
        displayProducts(products.filter(product => product == product))
      }
    }
}

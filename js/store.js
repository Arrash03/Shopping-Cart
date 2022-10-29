let $ = document;

let addShopBtns = $.querySelectorAll(".shop-item-button");
let cartItemsDiv = $.querySelector(".cart-items");
let totalPrice = $.querySelector(".cart-total-price");

let cartBasketTitles = {};

loadEventListeners();
function loadEventListeners(){
    addShopBtns.forEach(function(btn){
        btn.addEventListener("click", AddProduct);
    });
}
let cartItemTitle;
function AddProduct(e){
    cartItemTitle = e.path[2].children[0].cloneNode(true);
    if(cartItemTitle.textContent in cartBasketTitles){
        console.log(cartBasketTitles[cartItemTitle.textContent]["number"].value);
        // add one more product
        cartBasketTitles[cartItemTitle.textContent]["number"].value = Number(cartBasketTitles[cartItemTitle.textContent].value) + 1;
        console.log(cartBasketTitles[cartItemTitle.textContent]["number"].value);

    }
    else{
        // create formal data for DB
        cartBasketTitles[cartItemTitle.textContent] = {};
        // main product div
        let cartRow = $.createElement("div");
        cartRow.className = "cart-row";
        // three first sections 1
        let cartItem = $.createElement("div");
        cartItem.classList.add("cart-item", "cart-column");
        // cart-item children
        let cartItemImg = e.path[2].children[1].cloneNode(true);
        cartItemImg.style.cssText = "width:100px; height:100px";
        cartItemImg.className = "cart-item-image";
        // cartItemTitle
        cartItemTitle.className = "cart-item-title";
        cartItem.appendChild(cartItemImg);
        cartItem.appendChild(cartItemTitle);
        // take price in this turn
        // three first sections 2
        let cartPrice = $.createElement("span");
        cartPrice.innerHTML = e.target.previousElementSibling.textContent;
        // save in DB
        cartBasketTitles[cartItemTitle.textContent]["price"] = e.target.previousElementSibling.textContent;
        //--
        cartPrice.classList.add("cart-price", "cart-column");
        // three first sections 3
        let cartQuantity = $.createElement("div");
        cartQuantity.classList.add("cart-quantity", "cart-column");
        // cart-quantity children
        cartQuantity.innerHTML = `<input class=${"cart-quantity-input"} type=${"number"} value=${"1"}>`;
        let dangerBtn = $.createElement("button");
        dangerBtn.classList.add("btn", "btn-danger");
        dangerBtn.type = "button";
        dangerBtn.innerHTML = "REMOVE";
        // save in DB
        cartBasketTitles[cartItemTitle.textContent]["number"] = cartQuantity.firstElementChild;
        // --
        dangerBtn.addEventListener("click", removeProduct);
        cartQuantity.appendChild(dangerBtn);
        // append three first sections to main div
        cartRow.appendChild(cartItem);
        cartRow.appendChild(cartPrice);
        cartRow.appendChild(cartQuantity);
        // add event to input
        cartQuantity.firstElementChild.addEventListener("change", calculateTotalPrice);
        // append main div to main cartBasketTitles
        cartItemsDiv.appendChild(cartRow);
        // total price
        calculateTotalPrice();
    }
}
function removeProduct(e){
    // remove from DB
    let productTitle = e.path[2].firstElementChild.children[1].textContent;
    delete cartBasketTitles[productTitle];
    // remove from page
    e.path[2].remove();
    // change total price
    calculateTotalPrice();
}
function calculateTotalPrice(){
    let total = 0;
    let price;
    let number;
    for(let product in cartBasketTitles){
        price = cartBasketTitles[product]["price"].slice(1);
        number = cartBasketTitles[product]["number"].value;
        total += (number*price);
    }
    totalPrice.innerHTML = total;
}

import { handleExistingCart } from "./cartpersistence.js";
import { loadCSV } from "./db.js";

// event listener on window load that loops through session storage and adds items that were originally in the cart before reload back to the cart so the cart persits after navigating to a new page.
window.addEventListener('load', () =>{
    console.log("Hello")
    updateCartTotal()
    for (let i = 0; i < sessionStorage.length; i++) {
        let key = sessionStorage.key(i);
        let value = sessionStorage.getItem(key);
        let itemInfo = JSON.parse(value);
        if (Array.isArray(itemInfo) && itemInfo.length === 3) {
            console.log(itemInfo[2]);
            handleExistingCart(itemInfo[2])
        }
    }
});

// function that fires when an add to cart button is clicked, receives a sku value from the button thats being clicked, use regex to sstrip numbers from the sku that will correspond with the map keys that will call a validation func before adding to cart.
export function handleCart (productClicked){
    // console.log(productClicked)
    const regex = /([a-zA-Z]+)(\d+)/;
    const str = productClicked
    const matches = str.match(regex);
    const mapkey = matches[1]

    const cartMap = {
        "Ph": ["../Database/Tables/Phones.csv", productClicked],
        "PJ": ["../Database/Tables/Projectors.csv", productClicked],
        "Ta": ["../Database/Tables/Tablets.csv", productClicked],
        "Co": ["../Database/Tables/Consoles.csv", productClicked],
        "L": ["../Database/Tables/Laptops.csv", productClicked],
        "D": ["../Database/Tables/Desktops.csv", productClicked],
        "M": ["../Database/Tables/Monitors.csv", productClicked],
        "P": ["../Database/Tables/Printers.csv", productClicked],
        "T": ["../Database/Tables/Tvs.csv", productClicked],
        "C": ["../Database/Tables/Cameras.csv", productClicked],
    };

    // console.log(cartMap[mapkey])
    checkCartListing(cartMap[mapkey])
}

// function that checks if the item that is trying to be added to the cart, is already in the cart, if it is then it wont be added. If it is not then it will be added by calling the addToCart() function.
function checkCartListing(productInfo){
    const existingProducts = document.getElementsByClassName('cart-card')
    if (existingProducts.length == 0){
        addToCart(productInfo)
    } else {
        let productFound = false;
        for (let i = 0; i < existingProducts.length; i++){
            if (existingProducts[i].getAttribute('data-category') == productInfo[1]){
                console.log("This item is already in your cart");
                productFound = true;
                window.alert("You already have this item in your cart, to edit the quantity use the quantity box.")
                break;
            }
        }
        if (!productFound) {
            console.log("adding to cart!!!");
            addToCart(productInfo);
        }
    }
}

// function that is called whenever an item subtotal is recalculated, which grabs all the individual item subtotals from session storage and creates a grand total for the cart.
export function updateCartTotal(){
    console.log("entering func")
    let total = 0;
    for (let i = 0; i < sessionStorage.length; i++) {
        let key = sessionStorage.key(i);
        let value = sessionStorage.getItem(key);
        let totals = JSON.parse(value);
        let price = parseFloat(totals[1]);
        console.log(totals)

        if (isNaN(price)) {
            console.log(`Error parsing price for key ${key}: ${value}`);
        } else {
            total += price;
        }
    }
    console.log(total);
    let cartTotal = document.getElementById('cartTotal')
    cartTotal.textContent = 'Cart Total: $' + total.toFixed(2) 
}

// function that adds item to cart, first loops through database to retreive information and iamges needed to render the product on the cart, then builds the product in the cart by creating DOM elements and adding predefined classes.
function addToCart(productInfo){
    let productsData = loadCSV(productInfo[0])
    let title;
    let category;
    let imagePath;
    let priceD;
    let priceC;
    let full_price;
    let sku;
    let stock;


    for (let i = 0; i < productsData.length - 1; i++){

        if (productsData[i].sku == productInfo[1]){
            title = productsData[i].title ;
            category = productsData[i].category ;
            if (window.location.pathname == "/index.html"){
                imagePath = `img/${category}/${productsData[i].sku}.jpg`;
            } else{
                imagePath = `../img/${category}/${productsData[i].sku}.jpg`;
            }
            
            priceD = productsData[i].priced;
            priceC = productsData[i].pricec;
            full_price = parseFloat(priceD + "." + priceC)
            sku = productsData[i].sku
            // console.log(full_price)
            stock = productsData[i].stock

        }
    }
    console.log(full_price)
    const cartAside = document.getElementsByClassName('cart-sidebar')[0]
    
    const productCardDiv = document.createElement('div')
    productCardDiv.classList.add('product-card')
    productCardDiv.classList.add('cart-card')
    productCardDiv.setAttribute('data-category', sku)

    const cartTitle = document.createElement('p')
    cartTitle.classList.add('cart-title')
    cartTitle.textContent = title
    productCardDiv.appendChild(cartTitle)

    const imageContainerDiv = document.createElement('div')
    imageContainerDiv.classList.add("image-container")

    const cartImage = document.createElement('img')
    cartImage.classList.add("product-img")
    cartImage.classList.add("cart-img")
    cartImage.setAttribute('src', imagePath)
    imageContainerDiv.appendChild(cartImage)
    productCardDiv.appendChild(imageContainerDiv)

    const priceControlsDiv = document.createElement('div')
    priceControlsDiv.classList.add('price-controls')

    const cartContainer = document.createElement('div')
    cartContainer.classList.add('cart-container')
    const priceCart = document.createElement('p')
    priceCart.textContent = "$ " + priceD + "." + priceC
    priceCart.classList.add('price-cart')
    cartContainer.appendChild(priceCart)
    const multi = document.createElement('p')
    multi.textContent = "x"
    multi.classList.add('multi')
    cartContainer.appendChild(multi)
    const numberInput = document.createElement('input')
    numberInput.type = 'number'
    numberInput.setAttribute('min', 1)
    numberInput.setAttribute('max', stock)
    numberInput.setAttribute('data-category', sku)
    numberInput.classList.add('number-input')
    numberInput.addEventListener('change', function updateSubtotal(){
        let quantity = numberInput.value
        console.log(quantity)
        console.log(stock)
        if (quantity == stock){
            // window.alert("Max stock exceeded: Only " + stock + " items in stock")
        }
        let itemSubPrice = quantity * full_price
        console.log(itemSubPrice)
        itemSubtotal.textContent = "$" + itemSubPrice.toFixed(2)
        sessionStorage.setItem(sku, JSON.stringify([quantity, itemSubPrice.toFixed(2), sku]))
        updateCartTotal()
    
    })

    const cartContainer2 = document.createElement('div')
    cartContainer2.classList.add('cart-container')

    // button eent listener function that clears item data from session storage and recalculates price.
    const rbutton = document.createElement('button')
    rbutton.classList.add('remove-button')
    rbutton.textContent = "Remove"
    rbutton.addEventListener('click', function(){
        console.log(document.getElementsByClassName('cart-card'))
        let exisitingElements = document.getElementsByClassName('cart-card')
        for (let i = 0; i < exisitingElements.length; i++){
            if (exisitingElements[i].getAttribute('data-category') == rbutton.getAttribute('data-category')){
                sku = rbutton.getAttribute('data-category')
                sessionStorage.removeItem(sku)
                updateCartTotal()
                exisitingElements[i].remove()
                
            }
        }
    })

    rbutton.setAttribute('data-category', sku)

    cartContainer2.appendChild(rbutton)
    const itemSubtotal = document.createElement('p')
    itemSubtotal.classList.add('item-subtotal')
    itemSubtotal.textContent = "$" + full_price
    cartContainer2.appendChild(itemSubtotal)

    numberInput.value = 1
    numberInput.dispatchEvent(new Event('change'));

    cartContainer.appendChild(numberInput)
    priceControlsDiv.append(cartContainer)
    productCardDiv.appendChild(priceControlsDiv)

    priceControlsDiv.append(cartContainer2)
    cartAside.appendChild(productCardDiv)
}

// function that toggles checkout form on and off
const checkOutButton = document.getElementsByClassName('checkout-button')[0]
checkOutButton.addEventListener('click', function (){
    // console.log("func ran!!!!!!!!")
    const popup = document.getElementById('container')
    popup.classList.toggle('container-hidden')
    
    const page = document.getElementsByClassName('main')[0]
    page.style.opacity = 0.5
    const FinalPrice = document.getElementById('cartTotal').textContent
    const checkoutprice = document.getElementsByClassName('hhh')[0]
    checkoutprice.textContent = FinalPrice
    console.log(FinalPrice)
    console.log(popup)

    const purchaseButton = document.getElementById('makePayment')

// function that validates the entries of the checkout form.
    purchaseButton.addEventListener('click', function validateCart() {
        let ccNumberEntry = document.getElementById('cn')
        console.log(ccNumberEntry)
        let cNameEntry = document.getElementById('chn')
        console.log(cNameEntry)
        let expEntry = document.getElementById('ed')
        console.log(expEntry)
        let cvvEntry = document.getElementById('cv')
        console.log(cvvEntry)

        const existingProducts = document.getElementsByClassName('cart-card');
        // uses regex to match the correct data fromat, if all pass page is changed to sucess page and sessionStoroage is cleared.
        if (ccNumberEntry.value.length !== 16) {
          window.alert("Invalid credit card number, must be of length 16 and numbers only!");
        } else if (cNameEntry.value.length < 1) {
          window.alert("Invalid cardholder name");
        } else if (!expEntry.value.match(/^\d{2}\/\d{2}$/)) {
          window.alert("Invalid expiration date");
        } else if (!cvvEntry.value.match(/^\d{3}$/)) {
          window.alert("Invalid CVV");
        } else if (existingProducts.length == 0) {
          window.alert("Cart is empty");
        } else {
          sessionStorage.clear();
          window.location.href = "../manage/success.html";
        }
      }
      )
    

    
})

// function that returns page opacity to nromal when checkout form is closed.
const cancel = document.getElementById('cancel').addEventListener('click', function(){
    const popup = document.getElementById('container')
    const page = document.getElementsByClassName('main')[0]
    popup.classList.toggle('container-hidden')
    page.style.opacity = 1
})



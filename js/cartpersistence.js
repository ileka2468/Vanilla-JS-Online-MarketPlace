// Script that is almost an exact copy of cart.js except it rerenders cart items by retreiving their previouss info from session storage.

import { updateCartTotal } from "./cart.js";
import { loadCSV } from "./db.js";
export function handleExistingCart (productClicked){
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

    // console.log(mapkey + " handling existing products");
    rerenderCart(cartMap[mapkey])
    
}

const rerenderCart = (productToRender) =>{
    // console.log(productToRender)

    let productsData = loadCSV(productToRender[0])
    let title;
    let category;
    let imagePath;
    let priceD;
    let priceC;
    let full_price;
    let sku;
    let stock;


    for (let i = 0; i < productsData.length - 1; i++){

        if (productsData[i].sku == productToRender[1]){
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
    // console.log(full_price)
    // sessionStorage.setItem(sku, JSON.stringify([1, full_price, sku]))
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
        // console.log(quantity)
        // console.log(stock)
        if (quantity == stock){
            // window.alert("Max stock exceeded: Only " + stock + " items in stock")
        }
        let itemSubPrice = quantity * full_price
        // console.log(itemSubPrice)
        itemSubtotal.textContent = "$" + itemSubPrice.toFixed(2)
        sessionStorage.setItem(sku, JSON.stringify([quantity, itemSubPrice.toFixed(2), sku]))
        updateCartTotal()
    
    })

    const cartContainer2 = document.createElement('div')
    cartContainer2.classList.add('cart-container')

    
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

    let previous_quantity = sessionStorage.getItem(sku)
    let parsedList = JSON.parse(previous_quantity);
    let prev_quant = parseFloat(parsedList[0]);
    numberInput.value = prev_quant
    console.log(prev_quant + "This was the previous quanitity")
    for (let i = 0; i <= prev_quant; i++){
        numberInput.dispatchEvent(new Event('change'));
        console.log("ran event LOL")
    }
    

    cartContainer.appendChild(numberInput)
    priceControlsDiv.append(cartContainer)
    productCardDiv.appendChild(priceControlsDiv)

    priceControlsDiv.append(cartContainer2)
    cartAside.appendChild(productCardDiv)
}
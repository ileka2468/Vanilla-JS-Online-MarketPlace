
import { loadCSV } from './db.js';
import { handleCart } from './cart.js';

// console.log(window.location.pathname)

let current_directory = window.location.pathname
// based on which page the user is currently looking at, render the product for that page using a switch statement

setTimeout(() => {
  switch(current_directory){
    case "/index.html":
      loadDefaultAll();
      break;
    case "/products/laptops.html":
      loadContent("Laptops");
      break;
    case "/products/desktops.html":
      loadContent("Desktops");
      break;
    case "/products/monitors.html":
      loadContent("Monitors");
      break;
    case "/products/printers.html":
      loadContent("Printers");
      break;
    case "/products/tvs.html":
      loadContent("Tv's");
      break;
    case "/products/projectors.html":
      loadContent("Projectors");
      break;
    case "/products/phones.html":
      loadContent("Phones");
      break;
    case "/products/tablets.html":
        loadContent("Tablets");
        break;
    case "/products/cameras.html":
        loadContent("Cameras");
        break;

    case "/products/consoles.html":
      loadContent("Consoles");
      break;
  }
}, 500);


// Uses a product map and cateogry of the item to evaluate to a csv path for the product that needs to be rendered. Then calls fetchCOntent function.
function loadContent(category){
  const productMap = {
          "Laptops": "../database/tables/Laptops.csv",
          "Desktops": "../database/tables/Desktops.csv",
          "Monitors": "../database/tables/Monitors.csv",
          "Printers": "../database/tables/Printers.csv",
          "Tv's": "../database/tables/Tvs.csv",
          "Phones": "../database/tables/Phones.csv",
          "Tablets": "../database/tables/Tablets.csv",
          "Cameras": "../database/tables/Cameras.csv",
          "Consoles": "../database/tables/Consoles.csv",
          "Projectors": "../database/tables/Projectors.csv",
        }
        const new_products = loadCSV(productMap[category])
        // console.log(new_products);
        fetchContent(new_products, category)
}

// fetchContent function that redners all product for index page by using a for each loop to call fetch content for each csv file.
 function loadDefaultAll(){
  const productDiv = document.querySelector(".products")
  productDiv.innerHTML = ""

  let all = 
    [['../database/tables/Laptops.csv', 'Laptops'],
    ['../database/tables/Desktops.csv', 'Desktops'],
    ['../database/tables/Monitors.csv', 'Monitors'],
    ['../database/tables/Printers.csv', 'Printers'],
    ['../database/tables/Tvs.csv', "Tv's"],
    ['../database/tables/Phones.csv', 'Phones'],
    ['../database/tables/Tablets.csv', 'Tablets'],
    ['../database/tables/Cameras.csv', 'Cameras'],
    ['../database/tables/Consoles.csv', 'Consoles'],
    ['../database/tables/Projectors.csv', 'Projectors']
]


all.forEach(table =>{
  let product = loadCSV(table[0])
  // console.log(product);
  fetchContent(product, table[1])

});
}


// loops through each csv row and creates a product card for that item using the DOM to create elemnts.
export function fetchContent(products, productName){
  // console.log("This is the product name that will be used for the URL" + productName)
  for (let i = 0; i < products.length - 1; i++) {
    const name_cat = productName
    // console.log(productName)
    const productsContainer = document.querySelector('.products');
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productsContainer.appendChild(productCard);
  
    const productImgDiv = document.createElement('div');
    productImgDiv.classList.add('product-card-img');
    productCard.appendChild(productImgDiv);
  
    const productImg = document.createElement('img');
    productImg.classList.add('product-img');
    productImg.setAttribute('alt', products[i].title);
  
    
    productImg.setAttribute('src', "../img/" + name_cat + "/" + products[i].img);
    // console.log(productImg);
 
    productImgDiv.appendChild(productImg);
  
    const productTitle = document.createElement('h5');
    productTitle.classList.add('product-title');
    productTitle.textContent = products[i].title;
    productCard.appendChild(productTitle);
  
    const stockRemaining = document.createElement('p');
    stockRemaining.classList.add('product-stock');
    stockRemaining.textContent = `Stock remaining: ${products[i].stock}`;
    productCard.appendChild(stockRemaining);
  
    const info = document.createElement('p');
    info.classList.add('info');
    productCard.appendChild(info);
  
    const shippingSpan = document.createElement('span');
    shippingSpan.classList.add('shipping');
    shippingSpan.textContent = 'Free 1 day';
    info.appendChild(shippingSpan);
  
    const shippingText = document.createTextNode(' shipping with ');
    info.appendChild(shippingText);
  
    const membershipSpan = document.createElement('span');
    membershipSpan.classList.add('membership');
    membershipSpan.textContent = 'GadgetBay Plus';
    info.appendChild(membershipSpan);
  
    const priceDiv = document.createElement('div');
    priceDiv.classList.add('price');
    productCard.appendChild(priceDiv);
  
    const dollarSign = document.createElement('span');
    dollarSign.classList.add('dollar-sign');
    dollarSign.textContent = '$';
    priceDiv.appendChild(dollarSign);
  
    const dollars = document.createElement('span');
    dollars.classList.add('dollars');
    dollars.textContent = products[i].priced;
    priceDiv.appendChild(dollars);
  
    const cents = document.createElement('span');
    cents.classList.add('cents');
    if (products[i].pricec == 0){
      cents.textContent = products[i].pricec + "0";
    }
    else{
      cents.textContent = products[i].pricec;
    }
    
    priceDiv.appendChild(cents);
  
    if (products[i].salePrice) {
      const sale = document.createElement('p');
      sale.classList.add('sale');
      sale.textContent = 'Down from: ';
  
      const salePrice = document.createElement('span');
      salePrice.textContent = products[i].salePrice;
      sale.appendChild(salePrice);
  
      priceDiv.appendChild(sale);
    }
  
    const addToCartButton = document.createElement('button');
    addToCartButton.classList.add('atc-button');
    addToCartButton.setAttribute('value', products[i].sku);
    addToCartButton.textContent = 'Add to cart';
    addToCartButton.addEventListener('click', (event) => {
      // console.log(addToCartButton.value);
      handleCart(addToCartButton.value)

     
    });

    productCard.appendChild(addToCartButton);
  }
  
  
}



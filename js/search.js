
import { searchTerms } from "./searchterms.js";


// called with the search term in the box and ran against a list of potential searchterms from searchterms.js, if it is a valid search it will have a key match in the product map below and go thorugh switch cases to redirect to the propper prage depending on if you are on the index page or another page at the time.
const getCategory = (term, enteredTerm) => {
  const productsDiv = document.querySelector('.products');
  let searchTerm = term;
  console.log(searchTerm);
  
  const productMap = {
    "Laptops": "../Database/Tables/Laptops.csv",
    "Desktops": "../Database/Tables/Desktops.csv",
    "Monitors": "../Database/Tables/Monitors.csv",
    "Printers": "../Database/Tables/Printers.csv",
    "Tv's": "../Database/Tables/Tvs.csv",
    "Phones": "../Database/Tables/Phones.csv",
    "Tablets": "../Database/Tables/Tablets.csv",
    "Cameras": "../Database/Tables/Cameras.csv",
    "Consoles": "../Database/Tables/Consoles.csv",
    "Projectors": "../Database/Tables/Projectors.csv",
  };
  // if the searchterm is valid we run through a switch case to redirect to the correct page based on the current location.
  if (searchTerm in productMap){
    switch(searchTerm){
      case "Laptops":
        console.log(window.location.pathname)
        if (window.location.pathname == "/index.html"){window.location.href = '/products/laptops.html';}else{window.location.href = 'laptops.html';}
        break;
      case "Monitors":
        if (window.location.pathname == "/index.html"){window.location.href = '/products/monitors.html';}else{window.location.href = 'monitors.html';}
        break;
      case "Printers":
        if (window.location.pathname == "/index.html"){window.location.href = '/products/printers.html';}else{window.location.href = 'printers.html';}
        break;
      case "Tv's":
        if (window.location.pathname == "/index.html"){window.location.href = '/products/tvs.html'; }else{window.location.href = 'tvs.html';}
        break;
      case "Phones":
        if (window.location.pathname == "/index.html"){window.location.href = '/products/phones.html'; }else{window.location.href = 'phones.html';}
        break;
      case "Tablets":
        if (window.location.pathname == "/index.html"){window.location.href = '/products/tablets.html'; }else{window.location.href = 'tablets.html';}
        break;
      case "Cameras":
        if (window.location.pathname == "/index.html"){window.location.href = '/products/cameras.html'; }else{window.location.href = 'cameras.html';}
        break;
      case "Consoles":
        if (window.location.pathname == "/index.html"){window.location.href = '/products/consoles.html'; }else{window.location.href = 'consoles.html';}
        break;
      case "Projectors":
        if (window.location.pathname == "/index.html"){window.location.href = '/products/projectors.html'; }else{window.location.href = 'projectors.html';}
        break;
      case "Desktops":
        if (window.location.pathname == "/index.html"){window.location.href = '/products/desktops.html'; }else{window.location.href = 'desktops.html';}
        break;
    }

  }else{
    console.log("invalid search term");
    window.alert("No results found for " + enteredTerm + " Check your spelling and try again.");
  }
    
  
};


const searchBtn = document.getElementById('search')
const searchBox = document.getElementById('searchBox');

// event listener on enter key that simulates a click on the searchButton to fire the same function.
searchBox.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    console.log(event);
    searchBtn.click();
  }
});

// event listenenr that calles the getCateogry function
searchBtn.addEventListener('click',() =>{
  console.log(searchBox.value)
  getCategory(searchTerms[searchBox.value], searchBox.value)
});

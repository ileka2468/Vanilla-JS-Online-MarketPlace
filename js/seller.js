import { loadCSV } from "./db.js";
// This script builds the seller view on the seller dashbaord
fetchSellerView()

// function that deines all the csv file paths, and their category which gets looped thorugh, the table to manage listings will be built by looping through each files rows and adding that csv row to the table by creating DOM elements and predefined classes.
function fetchSellerView(){

  let all = [['../database/tables/laptops.csv', 'Laptops'],
    ['../Database/Tables/Desktops.csv', 'Desktops'],
    ['../Database/Tables/Monitors.csv', 'Monitors'],
    ['../Database/Tables/Printers.csv', 'Printers'],
    ['../Database/Tables/Tvs.csv', "Tv's"],
    ['../Database/Tables/Phones.csv', 'Phones'],
    ['../Database/Tables/Tablets.csv', 'Tablets'],
    ['../Database/Tables/Cameras.csv', 'Cameras'],
    ['../Database/Tables/Consoles.csv', 'Consoles'],
    ['../Database/Tables/Projectors.csv', 'Projectors']
]

// for each csv file we call the build table function
all.forEach(table =>{
  let product = loadCSV(table[0])
  buildTable(product, table[1])
  console.log(product);

});
}
// for each product in the csv table build a table row and insert it into the table on the manage listings table.
function buildTable(products, productCategory) {
    const table = document.querySelector('.table-content table');
  
    for (let product = 0; product < products.length - 1; product++){
      const imgName = products[product].img;
      const productName = products[product].title;
      const quantity = products[product].stock;
      const sku = products[product].sku;
      const imagePath = `../img/${productCategory}/${imgName}`;
      console.log(imagePath)
  
      // create new table row
      const row = document.createElement('tr');
  
      // create cells for the row
      const imgCell = document.createElement('td');
      const imgContainer = document.createElement('div');
      const img = document.createElement('img');
      img.className = 'product-img';
      img.src = imagePath;
      img.alt = '';
      imgContainer.className = 'table-img-container';
      imgContainer.appendChild(img);
      imgCell.appendChild(imgContainer);
  
      const nameCell = document.createElement('td');
      nameCell.textContent = productName;
  
      const quantityCell = document.createElement('td');
      quantityCell.textContent = quantity;
  
      const skuCell = document.createElement('td');
      skuCell.textContent = sku;
  
      const actionsCell = document.createElement('td');
      const actionsContainer = document.createElement('div');
      const editBtn = document.createElement('button');
      editBtn.className = 'edit';
      const editImg = document.createElement('img');
      editImg.src = './edit.png';
      editImg.alt = '';
      editImg.classList.add("edit-img")
      editBtn.value = products[product].sku;
      editBtn.appendChild(editImg);
      actionsContainer.appendChild(editBtn);
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete';
      const deleteImg = document.createElement('img');
      deleteImg.src = './delete.png';
      deleteImg.alt = '';
      deleteImg.classList.add("del-img")
      deleteBtn.value = products[product].sku;
      deleteBtn.appendChild(deleteImg);
      actionsContainer.appendChild(deleteBtn);
      actionsCell.appendChild(actionsContainer);
  
      // add cells to the row
      row.appendChild(imgCell);
      row.appendChild(nameCell);
      row.appendChild(quantityCell);
      row.appendChild(skuCell);
      row.appendChild(actionsCell);
  
      // add row to the table
      table.appendChild(row);
    };
  }
  
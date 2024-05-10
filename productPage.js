// import { selectedIndex } from "./sa_index";
// console.log(selectedIndex);
// let imageAndText = document.querySelector(".imageAndText");
// let imageDiv = document.createElement("div");


// imageAndText.classList.add("imageAndText");


// let productImage = document.createElement("img");
// imageDiv.append(productImage);

// Get the URL parameters
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Retrieve the product details from the parameters
const productName = urlParams.get('name');
const productImage = urlParams.get('imgurl');
const productBrand = urlParams.get('brand');
const productDiscount = urlParams.get('discount');
const productKg = urlParams.get('Kg');
const productMRP = urlParams.get('mrp');
const productDelivery = urlParams.get('dur');

// Display the product details on the page
document.getElementById("productName").innerText = productName;
document.getElementById("productImage").src = productImage;
document.getElementById("productBrand").innerText = "Brand: " + productBrand;
document.getElementById("productDiscount").innerText = "Discount: " + productDiscount;
document.getElementById("productKg").innerText = "Weight: " + productKg;
document.getElementById("productMRP").innerText = "MRP: Rs " + productMRP;
document.getElementById("productDelivery").innerText = "Delivery: " + productDelivery;
let arrays = [];

// Fetch products from products.json
fetch('db.json')
  .then(response => response.json())
  .then(data => {
    arrays = [data.products, data.products];
     // Two sets of products
     console.log(arrays);
    renderProducts();
  })
  .catch(error => console.error('Error fetching products:', error));

function renderProducts() {
  arrays.forEach((array, i) => {
    let bestsellersDiv = document.getElementById(`bestsellersSlide${i+1}`);
    bestsellersDiv.innerHTML = "";

    array.forEach((el, index) => {
      let div = document.createElement("div");
      div.addEventListener("click", ()=>{
        console.log("clicked");
        window.location.href = "productDetails.html";
      })
      div.style.minWidth = "24%";
      let img = document.createElement("img");
      img.src = el.imgurl;
      img.alt = el.name;
      img.addEventListener("click", () => showProductDetails(index));
      let h3 = document.createElement("h3");
      h3.innerText = el.name;
      let p1 = document.createElement("p");
      p1.innerText = el.brand;
      let p2 = document.createElement("p");
      p2.innerText = "Rs " + el.mrp;
      let addButton = document.createElement("button");
      addButton.innerText = "Add";
      addButton.classList.add("addButton");
      div.append(img, h3, p1, p2, addButton);
      bestsellersDiv.appendChild(div);
    });
  });
}

// function showProductDetails(index) {
//   let product = arrays.flat()[index];
//   document.getElementById("productName").innerText = product.name;
//   document.getElementById("productImage").src = product.imgurl;
//   document.getElementById("productBrand").innerText = "Brand: " + product.brand;
//   document.getElementById("productDiscount").innerText = "Discount: " + product.discount;
//   document.getElementById("productKg").innerText = "Weight: " + product.Kg;
//   document.getElementById("productMRP").innerText = "MRP: Rs " + product.mrp;
//   document.getElementById("productDelivery").innerText = "Delivery: " + product.dur;

//   document.getElementById("bestsellers1").style.display = "none";
//   document.getElementById("bestsellers2").style.display = "none";
//   document.getElementById("productDetails").style.display = "block";
// }

function showProductDetails(index) {
  let product = arrays.flat()[index];
  let queryString = `?name=${encodeURIComponent(product.name)}&imgurl=${encodeURIComponent(product.imgurl)}&brand=${encodeURIComponent(product.brand)}&discount=${encodeURIComponent(product.discount)}&Kg=${encodeURIComponent(product.Kg)}&mrp=${encodeURIComponent(product.mrp)}&dur=${encodeURIComponent(product.dur)};
  window.location.href = productdetails.html${queryString}`;
}

function scrollSlide(direction, slideId) {
  let bestsellersSlide = document.getElementById(slideId);
  let scrollAmount = 300; // Adjust as needed

  if (direction === "right") {
    bestsellersSlide.scrollLeft += scrollAmount;
  } else if (direction === "left") {
    bestsellersSlide.scrollLeft -= scrollAmount;
  }
}

// Call renderProducts to render initial products
renderProducts();
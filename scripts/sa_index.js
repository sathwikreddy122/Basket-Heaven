let arrays = [];

// Fetch products from products.json
fetch('db.json')
  .then(response => response.json())
  .then(data => {
    let filteredArray = data.products.filter(element => element.original_price <= 30);
    console.log(filteredArray);
    arrays = [data.products, filteredArray];
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
        runfunction(el);
        window.location.href = "productDetails.html";
      })
      div.style.minWidth = "24%";
      let img = document.createElement("img");
      img.src = el.image;
      img.alt = el.product;
      // img.addEventListener("click", () => showProductDetails(index));
      let h3 = document.createElement("h3");
      h3.innerText = el.product;
      let p1 = document.createElement("p");
      p1.innerText = el.brand_name;
      let p2 = document.createElement("p");
      p2.innerText = "Rs " + el.original_price;
      let addButton = document.createElement("button");
      addButton.innerText = "Add";
      addButton.classList.add("addButton");
      div.append(img, h3, p1, p2, addButton);
      bestsellersDiv.appendChild(div);
    });
  });
}

let detailArray = [];

function runfunction(elem) {
  console.log(elem.image);
  let obj = {
    image: elem.image,
    name: elem.product,
    brand: elem.brand_name,
    
    price: elem.original_price,
  };
  detailArray.push(obj);

  localStorage.setItem("productdetail", JSON.stringify(detailArray));
  console.log(detailArray);
}

// function showProductDetails(index) {
//   let product = arrays.flat()[index];
//   let queryString = `?name=${encodeURIComponent(product.name)}&imgurl=${encodeURIComponent(product.imgurl)}&brand=${encodeURIComponent(product.brand)}&discount=${encodeURIComponent(product.discount)}&Kg=${encodeURIComponent(product.Kg)}&mrp=${encodeURIComponent(product.mrp)}&dur=${encodeURIComponent(product.dur)};
//   window.location.href = productdetails.html${queryString}`;
// }

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
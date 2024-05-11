let arrays = [
  {
  "image": "https://www.bigbasket.com/media/uploads/p/m/40216157_6-sri-sri-tattva-organic-brown-sugar.jpg?tr=w-1920,q=80",
  "discount": 10,
  "product": "Organic Brown Rice",
  "quantity": "5 kg",
  "original_price": 300,
  "discounted_price": 270,
  "brand_name": "Nature's Best",
  "rating": 4.1,
  "category": "Foodgrains, Oil & Masala"
},
{
  "image": "https://www.bigbasket.com/media/uploads/p/m/40179976_5-kelloggs-corn-flakes-original.jpg?tr=w-1920,q=80",
  "discount": 15,
  "product": "Kellogg's Corn Flakes",
  "quantity": "500 g",
  "original_price": 150,
  "discounted_price": 128,
  "brand_name": "Kellogg's",
  "rating": 4.1,
  "category": "Snacks & Branded Foods"
},
{
  "image": "https://www.bigbasket.com/media/uploads/p/m/1228372_1-fortune-premium-kachi-ghani-pure-mustard-oil.jpg?tr=w-1920,q=80",
  "discount": 8,
  "product": "Fortune Mustard Oil",
  "quantity": "1 L",
  "original_price": 180,
  "discounted_price": 165,
  "brand_name": "Fortune",
  "rating": 4.1,
  "category": "Foodgrains, Oil & Masala"
},
{
  "image": "https://www.bigbasket.com/media/uploads/p/m/40018854_5-himalaya-purifying-neem-face-wash.jpg?tr=w-1920,q=80",
  "discount": 5,
  "product": "Himalaya Neem Face Wash",
  "quantity": "150 ml",
  "original_price": 120,
  "discounted_price": 114,
  "brand_name": "Himalaya",
  "rating": 4.1,
  "category": "Beauty & Hygiene"
},

];


// Fetch products from products.json
// fetch('db.json')
//   .then(response => response.json())
//   .then(data => {
//     let filteredArray = data.products.filter(element => element.original_price <= 30);
//     console.log(filteredArray);
//     arrays = [...data.products, ...filteredArray];
//     console.log(data.products);
//     let newArr =  arrays.slice(1, 4);
    
//     console.log(newArr);
//     renderProducts(newArr);
//   })
  // .catch(error => console.error('Error fetching products:', error));

let bestsellersDiv = document.querySelector(`.bestsellersSlide1`);
let bestsellersDivTwo = document.querySelector(`.bestsellersSlide2`)
function renderProducts(arrays) {
  bestsellersDiv.innerHTML = "";
  // bestsellersDiv.style.height = "100vh";
  arrays.forEach((array, i) => {
    // console.log(array);

      let div = document.createElement("div");
      div.style.minWidth = "24%";
      let img = document.createElement("img");
      img.addEventListener("click", ()=>{
        console.log("clicked");
        runfunction(array);
        window.location.href = "productDetails.html";
      })
      img.src = array.image;
      img.alt = array.product;
      // img.addEventListener("click", () => showProductDetails(index));
      let h3 = document.createElement("h3");
      h3.innerText = array.product;
      let p1 = document.createElement("p");
      p1.innerText = array.brand_name;
      let p2 = document.createElement("p");
      p2.innerText = "Rs " + array.original_price;
      let addButton = document.createElement("div");
      addButton.innerText = "Add";
      addButton.classList.add("addButton");
      div.append(img, h3, p1, p2, addButton);
      bestsellersDiv.appendChild(div);

      
      addButton.addEventListener('click', async(e) => {

        // e.stopPropagation();
        e.preventDefault();

        console.log("Clicked");
    
        const user = JSON.parse(localStorage.getItem('user')) || '';
    
        if(user == ''){
          alert('Please login first..Heading to main page.');
          window.location.href='index.html';
          return;
        }
    
        //console.log(user);
        const product = {
          ...array,
          user,
          quantity:1
        };
    
        fetch('http://localhost:3000/cart-items',{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify(product)
        })
    
      });
  });
}

function renderProductsTwo(arrays) {
  bestsellersDivTwo.innerHTML = "";
  arrays.forEach((array, i) => {
    // console.log(array);

      let div = document.createElement("div");
      div.style.minWidth = "24%";
      let img = document.createElement("img");
      img.addEventListener("click", ()=>{
        console.log("clicked");
        runfunction(array);
        window.location.href = "productDetails.html";

      })
      img.src = array.image;
      img.alt = array.product;
      // img.addEventListener("click", () => showProductDetails(index));
      let h3 = document.createElement("h3");
      h3.innerText = array.product;
      let p1 = document.createElement("p");
      p1.innerText = array.brand_name;
      let p2 = document.createElement("p");
      p2.innerText = "Rs " + array.original_price;
      let addButton = document.createElement("button");
      addButton.innerText = "Add";
      addButton.classList.add("addButton");
      div.append(img, h3, p1, p2, addButton);
      bestsellersDivTwo.appendChild(div);

      addButton.addEventListener('click', async(e) => {
        // e.stopPropagation();
        e.preventDefault();

        console.log("Clicked");
    
        const user = JSON.parse(localStorage.getItem('user')) || '';
        if(user == ''){
          alert('Please login first..Heading to main page.');
          window.location.href='index.html';
          return;
        }
        //console.log(user);
        const product = {
          ...array,
          user,
          quantity:1
        };
         fetch('http://localhost:3000/cart-items',{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify(product)
        })
    
      });
  });
}

let detailArray = [];

function runfunction(elem) {
  console.log(elem.image);
  let obj = {
    image: elem.image,
    product: elem.product,
    brand_name: elem.brand_name,
    original_price: elem.original_price,
    category : elem.category,
    quantity : elem.quantity,
    discounted_price : elem.discounted_price,
    discount: elem.discount
  };
  
  console.log(obj);
  localStorage.setItem("productdetail", JSON.stringify(obj));
}

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
renderProducts(arrays);
renderProductsTwo(arrays);
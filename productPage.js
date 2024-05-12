let detail = JSON.parse(localStorage.getItem("productdetail"));
function productAppend(elem){
  console.log(elem)
    let img = document.createElement("img");
    img.setAttribute("src", elem.image);
    img.setAttribute("class", "detail");
    img.style.width = "25rem";
    img.style.height = "25rem";
    console.log(elem);
    document.querySelector("#imgapend").append(img);
    document.querySelector("#brand").innerText = elem.brand_name;
    console.log(elem.brand_name);
    document.querySelector("#name").innerText = elem.product;
    // document.querySelector("#strikoff").innerText = elem.strike;
    document.querySelector("#price").innerText = "Rs" + elem.original_price;
    // document.querySelector("#name").innerText = elem.name;
    // document.querySelector("#pnameAgain").innerText = elem.name;
}

let addButton = document.getElementById("addtocart")

let productcart = document.querySelector(".cart");
productcart.addEventListener('click',()=>{
  let user = JSON.parse(localStorage.getItem('user')) || '';
  if(user==''){
    alert('Please Log in.');
    return;
  }
  window.location.href='cart.html';
})

console.log(productcart);
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
  detail = JSON.parse(localStorage.getItem("productdetail"));

  const product = {
    ...detail,
    user,
    quantity:1
  };
  console.log(product)
   fetch('Basket-Heaven.onrender.com/cart-items',{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
    },
    body:JSON.stringify(product)
  })

});

productAppend(detail);
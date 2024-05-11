let category = JSON.parse(localStorage.getItem('category')) || '';
const links1 = document.querySelectorAll('.col>ul>li>a[href="#"]');
const links2 = document.querySelectorAll('.links a[href="#"]');
const links3 = document.querySelectorAll('#category-filter a[href="#"]');
const card_products = document.getElementById('card_products');
let main_container = document.getElementById('main_container');
const filter_container = document.getElementById('filter_container');
const ratings = document.querySelectorAll('#rating-filter>label>input');
const prices = document.querySelectorAll('#price-filter>label>input');
const discounts = document.querySelectorAll('#discount-filter>label>input');
const stats = document.querySelector('.stats');
const count = document.querySelector('.count');

//console.log(links1,links2,links3);

links2.forEach((link) => {
  const value = link.innerText;

  link.addEventListener('click', async (e) => {
    try {
      e.preventDefault();
      category = value;
      localStorage.setItem('category', JSON.stringify(category));

      const products = await fetch(
        `http://localhost:3000/products/?product_like=${category}`
      );

      const data = await products.json();
      stats.innerText = `${category} (${data.length})`;
      // console.log(data);
      appendData(data);
      stats.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      console.log(error);
    }
  });
});

links1.forEach((link) => {
  const value = link.innerText;

  link.addEventListener('click', (e) => {
    e.preventDefault();
    category = value;
    localStorage.setItem('category', JSON.stringify(category));

    fetchData();
    stats.scrollIntoView({ behavior: 'smooth' });
  });
});

links3.forEach((link) => {
  const value = link.innerText;

  link.addEventListener('click', (e) => {
    e.preventDefault();
    category = value;
    localStorage.setItem('category', JSON.stringify(category));

    fetchData();
    stats.scrollIntoView({ behavior: 'smooth' });
  });
});

ratings.forEach((rating) => {
  const value = Number(rating.value);

  rating.addEventListener('click', () => {
    //console.log(value, typeof value);
    if (rating.checked == true) {
      fetchData(`rating_gte=${value - 1}&rating_lte=${value}`);
      stats.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

prices.forEach((price) => {
  const value = price.value.split(',');
  const high = Number(value[0]);
  const low = Number(value[1]);

  // console.log(value,low,high);

  price.addEventListener('click', () => {
    if (price.checked == true) {
      fetchData(`discounted_price_lte=${low}&discounted_price_gte=${high}`);
      stats.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

discounts.forEach((discount) => {
  const value = discount.value.split(',');
  const high = Number(value[0]);
  const low = Number(value[1]);

  discount.addEventListener('click', () => {
    if (discount.checked == true) {
      fetchData(`discount_lte=${low}&discount_gte=${high}`);
      stats.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

async function fetchData(params = '') {
  const products = await fetch(
    `http://localhost:3000/products/?category_like=${category}&${params}`
  );

  // console.log(
  //   `http://localhost:3000/products/?category_like=${category}&${params}`
  // );

  const data = await products.json();
  stats.innerText = `${category} (${data.length})`;
  console.log(data);
  appendData(data);
}

fetchData();

function createProductCard(productData) {
  // Create a div element to contain the product card
  let div = document.createElement('div');
  div.addEventListener('click', () => {
    console.log('clicked');
    window.location.href = 'productDetails.html';
  });

  var imgDiv = document.createElement('div');
  var discount = document.createElement('div');
  discount.textContent = `${productData.discount}% Off`;
  discount.style.backgroundColor = 'green';
  discount.style.position = 'absolute';
  discount.style.borderTopLeftRadius = '10px';
  discount.style.borderBottomRightRadius = '10px';
  discount.style.padding = '5px 10px';
  discount.style.fontSize = '12px';
  discount.style.color = 'white';
  discount.style.zIndex = '1';
  div.appendChild(discount);

  div.style.minWidth = '24%';
  let img = document.createElement('img');
  img.src = productData.image;
  img.classList.add('productImage');
  img.style.padding = '20px';
  img.style.borderTopLeftRadius = '10px';
  img.style.position = 'relative';

  imgDiv.append(img);

  //img.alt = productData.name;
  //img.addEventListener("click", () => showProductDetails(index));
  var brandName = document.createElement('p');
  brandName.textContent = productData.brand_name;
  brandName.style.fontWeight = '10';

  var rating = document.createElement('div');
  rating.textContent = productData.rating + '☆';
  rating.style.fontSize = '13px';
  rating.style.padding = '2px 4px';
  rating.style.backgroundColor = '#E3F1CB';
  rating.style.width = 'max-content';
  rating.style.borderRadius = '5px';

  let h3 = document.createElement('h3');
  h3.innerText = productData.product;
  h3.classList.add('title');
  h3.style.height = '40px';

  let p1 = document.createElement('p');
  p1.innerHTML = `<b>₹${productData.original_price}</b>  <s style="font-size:11px;">₹${productData.discounted_price}</s>`;

  var quantity = document.createElement('div');
  quantity.textContent = 'Quantity ' + productData.quantity;
  quantity.style.fontSize = '11px';
  quantity.style.marginTop = '20px';

  let addButton = document.createElement('button');
  addButton.innerText = 'Add';
  addButton.classList.add('addButton');
  addButton.type = "button";

  addButton.addEventListener('click', async(e) => {

    e.stopPropagation();
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem('user')) || '';

    if(user == ''){
      alert('Please login first..Heading to main page.');
      window.location.href='index.html';
      return;
    }

    //console.log(user);
    const product = {
      ...productData,
      user,
      quantity:1
    };

    const item = await fetch('http://localhost:3000/cart-items',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(product)
    })

  });

  div.classList.add('card');
  div.append(imgDiv, brandName, h3, rating, quantity, p1, addButton);

  return div;
}
function appendData(data) {
  card_products.innerHTML = '';

  data.forEach((product) => {
    const productCard = createProductCard(product);
    card_products.append(productCard);
  });

  getCount();
}

const cart = document.querySelector('.cart');
cart.addEventListener('click',()=>{
  window.location.href='cart.html';
})

async function getCount(){
  const result = await fetch('http://localhost:3000/cart-items');
  const data = await result.json();
  
  let total = 0;
  data.forEach(item => {
    if(item.user == user)
      total++;

  })
}

getCount();
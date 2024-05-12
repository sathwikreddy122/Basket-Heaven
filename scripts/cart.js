const container = document.querySelector('.container');
const priceTag = document.querySelector('.price');
const savingsTag = document.querySelector('.savings');
const checkout = document.querySelector('.checkout');

const user = JSON.parse(localStorage.getItem('user'));
let total_price = 0;
let savings = 0;

checkout.addEventListener('click',async(e)=>{
  const res = await fetch('https://Basket-Heaven.onrender.com/cart-items');
  const items = await res.json();
  //console.log(items);
  let cnt=0;

  items.forEach((item) => {
    if (item.user == user) {
      cnt++;
      fetch(`https://Basket-Heaven.onrender.com/cart-items/${item.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    if(cnt>0){
      alert('Thanks for the purchase❤️')
    }else{
      alert('Please add items🛒')
    }
})
})

async function fetchData() {
  try{
  const res = await fetch('https://Basket-Heaven.onrender.com/cart-items');
  const items = await res.json();
   
  //console.log(items);
  appendData(items);
  }catch(err){
    console.log(err);
  }
}

function appendData(items) {
  items.forEach((item) => {
    if (item.user == user) {
      total_price += item.quantity*item.discounted_price;
      savings += item.quantity*(item.original_price - item.discounted_price);

      const card = createCard(item);
      container.append(card);
    }
  });

  priceTag.innerText=`Subtotal: ₹${total_price}`;
  savingsTag.innerHTML=`Savings: ₹${savings}`
}

function createCard(item) {
  const div = document.createElement('div');

  const categoryDiv = document.createElement('div');
  const category = document.createElement('p');
  category.innerText = item.category;
  category.style.borderBottom = '2px solid red';
  category.style.width = 'max-content';
  categoryDiv.style.margin = 'auto';
  category.style.margin = '20px 0px 10px 0px';
  categoryDiv.style.width='50%'
  categoryDiv.append(category);

  const card = document.createElement('div');
  const img = document.createElement('img');
  img.src = item.image;
  img.style.width = '125px';

  const productInfo = document.createElement('div');
  const product = document.createElement('p');
  product.innerText = item.product;

  const price = document.createElement('p');
  price.innerHTML = `<b>₹${item.original_price}</b>  <s style="font-size:11px;">₹${item.discounted_price}</s>`;

  productInfo.append(product, price);
  productInfo.style.display = 'flex';
  productInfo.style.width = '150px';
  productInfo.style.flexDirection = 'column';
  productInfo.style.justifyContent = 'center';
  product.style.margin = '0';
  price.style.margin = '10px 0';

  const decrease = document.createElement('button');
  decrease.innerText = '-';
  decrease.style.backgroundColor = 'red';
  decrease.style.color = 'white';
  decrease.style.padding='6px 10px';
  decrease.style.border = 'none';
  decrease.style.cursor='pointer';

  decrease.addEventListener('click', async() => {
    item.quantity = item.quantity - 1;

    if (!item.quantity||item.quantity == 1) {
      await fetch(`https://Basket-Heaven.onrender.com/cart-items/${item.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      await fetch(`https://Basket-Heaven.onrender.com/cart-items/${item.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
    }

    fetchData();
  });

  const quantity = document.createElement('span');
  quantity.innerText = item.quantity;

  const increase = document.createElement('button');
  increase.innerText = '+';
  increase.style.backgroundColor = 'green';
  increase.style.color = 'white';
  increase.style.border = 'none';
  increase.style.cursor='pointer';
  increase.style.padding='6px 10px';

  increase.addEventListener('click', async () => {
    item.quantity = item.quantity+1;

    // console.log(item,newItem);

    await fetch(`https://Basket-Heaven.onrender.com/cart-items/${item.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item)
    });

    fetchData();
  });

  const finalPrice = document.createElement('div');
  const total = document.createElement('p');
  total.innerHTML = `<b>₹${eval(item.quantity * item.discounted_price)}</b>`;

  const saved = document.createElement('p');
  saved.innerHTML = `<span style="color:green">Saved: ₹${eval(
    item.quantity * (item.original_price - item.discounted_price)
  )}</span>`;
  total.style.margin = '0';
  saved.style.margin = '0';

  finalPrice.append(total, saved);
  card.append(img, productInfo, decrease, quantity, increase, finalPrice);
  card.classList.add('card');

  div.append(categoryDiv, card);
  return div;
}

fetchData();

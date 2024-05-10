let category = JSON.parse(localStorage.getItem('category')) || '';
const links = document.querySelectorAll('a[href="#"]');

links.forEach((link) => {
  const value = link.innerText;

  link.addEventListener('click', (e) => {
    category = value;
    localStorage.setItem('category', JSON.stringify(category));
    fetchData();
  });
});

async function fetchData() {
  const products = await fetch(
    `http://localhost:3000/products/?category_like=${category}`
  );

  const data = await products.json();

  console.log(data);
}

fetchData();
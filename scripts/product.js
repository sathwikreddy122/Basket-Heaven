function createProductCard(productData) {
    // Create a div element to contain the product card
    var productCard = document.createElement('div');
    productCard.classList.add('product-card');

    // Create a div element to display the discount
    var discount = document.createElement('div');
    discount.textContent = productData.discount;
    discount.style.backgroundColor="green"
    discount.style.width="100px";
    // discount.style.margin="10px";
    discount.style.borderTopLeftRadius="10px";
    discount.style.borderBottomRightRadius="10px";
    discount.style.padding="10px";
    discount.style.fontSize="20px";
    discount.style.color="white"
    productCard.appendChild(discount);
  
    
    var productImage = document.createElement('img');
    productImage.src = productData.image;
    productImage.alt = productData.product;
    productImage.style.width = '280px'; // Adjust the width of the image
    productImage.style.height = '250px'; // Adjust the height of the image
    productImage.style.boxShadow = '2px 2px 4px 2px rgba(0, 0, 0, 0.1)';

    // Create a container div to center the image column-wise
    var containerDiv = document.createElement('div');
    containerDiv.style.display = 'flex';
    containerDiv.style.justifyContent = 'center'; // Center the content horizontally
    containerDiv.style.marginBottom="15px";
    containerDiv.appendChild(productImage);
    productCard.appendChild(containerDiv);

  
    // Create a div element to display the brand name
    var brandName = document.createElement('div');
    brandName.textContent = productData.brand_name;
    brandName.style.marginLeft="15px";
    brandName.style.fontWeight="10"
    productCard.appendChild(brandName);
    
  
    // Create a div element to display the product name
    var productName = document.createElement('div');
    productName.textContent = productData.product;
    productName.style.marginLeft="15px";
    productName.style.fontSize="30px"
    productCard.appendChild(productName);

    // Create a div element to display the rating
    var rating = document.createElement('div');
    rating.textContent = productData.rating+"☆";
    rating.style.marginLeft="15px";
    rating.style.fontSize="20px";
    rating.style.backgroundColor="#E3F1CB"
    rating.style.width="50px";
    rating.style.borderRadius="5px"
    productCard.appendChild(rating);
  
    // Create a div element to display the quantity
    var quantity = document.createElement('div');
    quantity.textContent = "Quantity "+productData.quantity;
    quantity.style.marginLeft="15px";
    quantity.style.fontSize="20px";
    productCard.appendChild(quantity);
    

  
    // Create a div element to display the original price
    var originalPrice = document.createElement('div');
    originalPrice.textContent = productData.original_price;
    productCard.appendChild(originalPrice);
  
    // Create a div element to display the discounted price
    var discountedPrice = document.createElement('div');
    discountedPrice.textContent = productData.discounted_price;
    productCard.appendChild(discountedPrice);
  
    
  
    
  
    // Create a div element to display the category
    var category = document.createElement('div');
    category.textContent = 'Category: ' + productData.category;
    productCard.appendChild(category);
  
    return productCard;
  }
  
  // Example usage:
  var productData = {
    "image": "https://www.bigbasket.com/media/uploads/p/m/10000180_15-fresho-sapota.jpg?tr=w-1920,q=80",
    "discount": "12% Off",
    "product": "Chickoo",
    "quantity": "1 kg",
    "original_price": "₹90",
    "discounted_price": "₹79",
    "brand_name": "Farm Fresh",
    "rating": 4.4,
    "category": "Fruits & Vegetables"
  };
  
  var productCard = createProductCard(productData);
  var productCard1 = createProductCard(productData);
  var productCard2 = createProductCard(productData);
  var productCard3 = createProductCard(productData);
  var productCard4 = createProductCard(productData);
  var productCard5 = createProductCard(productData);
  
   // Append the product card to the document body or any other container element
  let card_products = document.getElementById("card_products")
  
  card_products.append(productCard,productCard1,productCard2,productCard3,productCard4,productCard5)
  
  
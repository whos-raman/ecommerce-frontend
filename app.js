document.addEventListener('DOMContentLoaded', function () {
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const navigation = document.querySelector('.navigation');

  hamburgerMenu.addEventListener('click', function () {

  });
});

document.addEventListener('DOMContentLoaded', function () {
  const productGrid = document.querySelector('.product-grid');

  fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
      data.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.title}" loading="lazy">
                    <h5>${product.title}</h5>
                    <p>$${product.price}</p>
                    <button class="add-to-cart">Add to Cart</button>
                `;
        productGrid.appendChild(productCard);
      });
    })
    .catch(error => console.error('Error fetching products:', error));
});
const productCard = document.createElement('div');
productCard.classList.add('product-card');
productCard.innerHTML = `
<a href="product.html?id=${product.id}">
<img src="${product.image}" alt="${product.title}">
<h2>${product.title}</h2>
<p>$$product.proce}</p>
</a>
<button class="add-to-cart">Add to Cart</button>
`;
document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  fetch(`https://fakestoreapi.com/products/${productId}`)
    .then(response => response.json())
    .then(product => {
      document.getElementById('main-image').src = product.image;
      document.getElementById('product-name').innerText = product.title;
      document.getElementById('product-price').innerText = `$${product.price}`;
      document.getElementById('product-description').innerText = product.description;
    })
    .catch(error => console.error('Error fetching product details:', error));
});
document.getElementById('add-to-cart').addEventListener('click', function () {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const product = {
    id: productId,
    name: document.getElementById('product-name').innerText,
    price: document.getElementById('product-price').innerText,
    image: document.getElementById('main-image').src,
  };
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Product added to cart!');
});
const zoomLens = document.getElementById('zoom-lens');
const mainImage = document.getElementById('main-image');

mainImage.addEventListener('mousemove', function (e) {
  const rect = mainImage.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  zoomLens.style.left = `${x - zoomLens.offsetWidth / 2}px`;
  zoomLens.style.top = `${y - zoomLens.offsetHeight / 2}px`;
  zoomLens.style.display = 'block';

  // Create a zoomed image effect
  const zoomedImage = new Image();
  zoomedImage.src = mainImage.src;
  zoomedImage.style.transform = `scale(2)`;
  zoomedImage.style.position = 'absolute';
  zoomedImage.style.left = `-${x * 2}px`;
  zoomedImage.style.top = `-${y * 2}px`;
  zoomedImage.style.width = `${mainImage.width * 2}px`;
  zoomedImage.style.height = `${mainImage.height * 2}px`;
  zoomLens.appendChild(zoomedImage);
});

mainImage.addEventListener('mouseleave', function () {
  zoomLens.style.display = 'none';
  zoomLens.innerHTML = ''; // Clear the zoomed image
});
const sizeSelect = document.getElementById('size');
const colorSelect = document.getElementById('color');

sizeSelect.addEventListener('change', function () {
  // Update product preview based on selected size
  // Disable unavailable sizes if needed
});

colorSelect.addEventListener('change', function () {
  // Update product preview based on selected color
  // Disable unavailable colors if needed
});
const quantityInput = document.getElementById('quantity');
const decreaseButton = document.getElementById('decrease-quantity');
const increaseButton = document.getElementById('increase-quantity');

decreaseButton.addEventListener('click', function() {
    let quantity = parseInt(quantityInput.value);
    if (quantity > 1) {
        quantityInput.value = quantity - 1;
        updateTotalPrice();
    }
});

increaseButton.addEventListener('click', function() {
    let quantity = parseInt(quantityInput.value);
    if (quantity < 10) { // Assuming 10 is the max limit
        quantityInput.value = quantity + 1;
        updateTotalPrice();
    }
});
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const productEl = button.closest('.product');
    const id = productEl.dataset.id;
    const name = productEl.querySelector('.product-name').textContent;
    const price = parseFloat(productEl.querySelector('.product-price').dataset.price);
    const image = productEl.querySelector('.product-image').src;
    const variation = productEl.querySelector('.product-variation')?.value || '';
    const quantity = parseInt(productEl.querySelector('.product-qty').value);

    if (quantity <= 0) {
      alert("Please select a valid quantity.");
      return;
    }

    addToCart({ id, name, price, image, variation, quantity });
  });
});
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const index = cart.findIndex(item => item.id === product.id && item.variation === product.variation);

  if (index > -1) {
    cart[index].quantity += product.quantity;
  } else {
    cart.push(product);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  showAddToCartFeedback();
}
function showAddToCartFeedback() {
  const msg = document.createElement('div');
  msg.className = 'cart-feedback';
  msg.textContent = 'Item added to cart!';
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 2000);
}
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
});
function loadCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartContainer = document.getElementById('cart-items');
  cartContainer.innerHTML = '';

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    document.getElementById('checkout-btn').disabled = true;
    return;
  }

  cart.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div>
        <h3>${item.name}</h3>
        <p>Option: ${item.variation}</p>
        <p>Price: $${item.price.toFixed(2)}</p>
        <div class="qty-control">
          <button onclick="updateQty(${index}, -1)">−</button>
          <input type="number" value="${item.quantity}" min="1" disabled>
          <button onclick="updateQty(${index}, 1)">+</button>
        </div>
        <button onclick="removeItem(${index})" class="remove-btn">Remove</button>
      </div>
    `;
    cartContainer.appendChild(div);
  });

  updateTotal();
  updateCartCount();
}
function updateQty(index, change) {
  const cart = JSON.parse(localStorage.getItem('cart'));
  if (cart[index].quantity + change >= 1) {
    cart[index].quantity += change;
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
  }
}
function updateTotal() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  document.getElementById('cart-total').textContent = total.toFixed(2);
}
function removeItem(index) {
  const cart = JSON.parse(localStorage.getItem('cart'));
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}
document.getElementById('checkout-btn').addEventListener('click', () => {
  if (JSON.parse(localStorage.getItem('cart')).length > 0) {
    window.location.href = 'checkout.html';
  }
});
document.getElementByClassId("signin").addEventListener("click", function(){
    window.location.href = "login.html";
});
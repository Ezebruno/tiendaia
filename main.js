// Shopping cart state
let cart = [];

// DOM Elements
const cartIcon = document.getElementById('cartIcon');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');
const checkoutBtn = document.getElementById('checkoutBtn');
const contactForm = document.getElementById('contactForm');

// Add to cart buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', (e) => {
    const productCard = e.target.closest('.product-card');
    const productId = productCard.dataset.id;
    const productName = productCard.querySelector('h3').textContent;
    const productPrice = parseFloat(productCard.dataset.price);
    
    addToCart(productId, productName, productPrice);
    updateCartUI();
    showNotification('Producto añadido al carrito');
  });
});

// Cart icon click
cartIcon.addEventListener('click', () => {
  cartModal.classList.add('active');
  updateCartUI();
});

// Close cart
closeCart.addEventListener('click', () => {
  cartModal.classList.remove('active');
});

// Close cart when clicking outside
cartModal.addEventListener('click', (e) => {
  if (e.target === cartModal) {
    cartModal.classList.remove('active');
  }
});

// Checkout button
checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    showNotification('El carrito está vacío');
    return;
  }
  
  // Save cart data to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem('cartTotal', calculateTotal());
  
  // Redirect to payment page
  window.location.href = '/payment.html';
});

// Contact form submission
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const formData = {
    name: contactForm.name.value,
    email: contactForm.email.value,
    message: contactForm.message.value
  };
  
  // Here you would typically send this data to a server
  console.log('Form submitted:', formData);
  
  // Show success message
  showNotification('Mensaje enviado correctamente');
  
  // Clear form
  contactForm.reset();
});

// Navigation smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add item to cart
function addToCart(id, name, price) {
  const existingItem = cart.find(item => item.id === id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id,
      name,
      price,
      quantity: 1
    });
  }
}

// Update cart UI
function updateCartUI() {
  // Update cart items
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-info">
        <h4>${item.name}</h4>
        <p>$${item.price}</p>
      </div>
      <div class="quantity-controls">
        <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
        <span>${item.quantity}</span>
        <button class="quantity-btn" onclick="updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
      </div>
    </div>
  `).join('');
  
  // Update total
  cartTotal.textContent = calculateTotal();
  
  // Update cart count
  cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}

// Update item quantity
function updateQuantity(id, newQuantity) {
  if (newQuantity < 1) {
    cart = cart.filter(item => item.id !== id);
  } else {
    const item = cart.find(item => item.id === id);
    if (item) {
      item.quantity = newQuantity;
    }
  }
  updateCartUI();
}

// Calculate total
function calculateTotal() {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
}

// Show notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: var(--accent-color);
    color: white;
    padding: 1rem;
    border-radius: 4px;
    z-index: 2000;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

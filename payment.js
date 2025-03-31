// Get cart data from localStorage
const cart = JSON.parse(localStorage.getItem('cart') || '[]');
const total = localStorage.getItem('cartTotal') || '0';

// Display order summary
const orderItems = document.getElementById('orderItems');
const orderTotal = document.getElementById('orderTotal');

// Update order summary
function updateOrderSummary() {
  orderItems.innerHTML = cart.map(item => `
    <div class="order-item">
      <span>${item.name} x ${item.quantity}</span>
      <span>$${(item.price * item.quantity).toFixed(2)}</span>
    </div>
  `).join('');
  
  orderTotal.textContent = total;
}

// Initialize page
updateOrderSummary();

// Payment method selection
const paymentOptions = document.querySelectorAll('input[name="paymentMethod"]');
const cardDetails = document.getElementById('cardDetails');

paymentOptions.forEach(option => {
  option.addEventListener('change', (e) => {
    if (e.target.value === 'paypal') {
      cardDetails.style.display = 'none';
    } else {
      cardDetails.style.display = 'block';
    }
  });
});

// Card number formatting
const cardNumber = document.getElementById('cardNumber');
cardNumber.addEventListener('input', (e) => {
  let value = e.target.value.replace(/\D/g, '');
  value = value.replace(/(\d{4})/g, '$1 ').trim();
  e.target.value = value;
});

// Expiry date formatting
const expiryDate = document.getElementById('expiryDate');
expiryDate.addEventListener('input', (e) => {
  let value = e.target.value.replace(/\D/g, '');
  if (value.length >= 2) {
    value = value.slice(0, 2) + '/' + value.slice(2);
  }
  e.target.value = value;
});

// CVV validation
const cvv = document.getElementById('cvv');
cvv.addEventListener('input', (e) => {
  e.target.value = e.target.value.replace(/\D/g, '');
});

// Form submission
const paymentForm = document.getElementById('paymentForm');
paymentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked');
  if (!selectedMethod) {
    alert('Por favor selecciona un método de pago');
    return;
  }

  // Here you would typically process the payment
  alert('¡Pago procesado exitosamente!');
  
  // Clear cart data
  localStorage.removeItem('cart');
  localStorage.removeItem('cartTotal');
  
  // Redirect back to store
  window.location.href = '/';
});
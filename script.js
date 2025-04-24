document.addEventListener('DOMContentLoaded', function() {
    // Menu navigation
    const navButtons = document.querySelectorAll('.nav-btn');
    const menuSections = document.querySelectorAll('.menu-section');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and sections
            navButtons.forEach(btn => btn.classList.remove('active'));
            menuSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding section
            const category = this.getAttribute('data-category');
            document.getElementById(category).classList.add('active');
        });
    });
    
    // Order functionality
    const orderButtons = document.querySelectorAll('.order-btn');
    const orderItems = document.querySelector('.order-items');
    const itemCount = document.querySelector('.item-count');
    const totalAmount = document.querySelector('.total-amount');
    
    let orderTotal = 0;
    let items = [];
    
    orderButtons.forEach(button => {
        button.addEventListener('click', function() {
            const menuItem = this.closest('.menu-item');
            const itemName = menuItem.querySelector('.item-name').textContent;
            const itemPrice = parseInt(menuItem.querySelector('.item-price').textContent.replace('Mt', ''));
            
            // Check if item already exists in order
            const existingItem = items.find(item => item.name === itemName);
            
            if (existingItem) {
                existingItem.quantity += 1;
                existingItem.total += itemPrice;
            } else {
                items.push({
                    name: itemName,
                    price: itemPrice,
                    quantity: 1,
                    total: itemPrice
                });
            }
            
            orderTotal += itemPrice;
            updateOrderSummary();
            
            // Show confirmation
            showToast(`${itemName} added to order`);
        });
    });
    
    function updateOrderSummary() {
        // Clear current items
        orderItems.innerHTML = '';
        
        // Add each item
        items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'order-item';
            itemElement.innerHTML = `
                <div class="order-item-name">${item.name}</div>
                <div class="order-item-details">
                    <span class="order-item-quantity">${item.quantity}x</span>
                    <span class="order-item-price">Mt${item.total}</span>
                </div>
            `;
            orderItems.appendChild(itemElement);
        });
        
        // Update totals
        itemCount.textContent = `${items.reduce((sum, item) => sum + item.quantity, 0)} items`;
        totalAmount.textContent = `Mt${orderTotal}`;
    }
    
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }
    
    // Checkout button
    document.querySelector('.checkout-btn').addEventListener('click', function() {
        if (items.length === 0) {
            showToast('Please add items to your order first');
            return;
        }
        
        // In a real implementation, this would open a reservation form
        showToast('Table reservation request sent!');
    });
});// Replace or add this to your script.js
function checkout() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  // Show notification
  const notification = document.getElementById('orderNotification');
  notification.classList.add('notification-visible');
  
  // Hide after 3 seconds
  setTimeout(() => {
    notification.classList.remove('notification-visible');
  }, 3000);

  // Reset cart (keep your existing cart clearing logic)
  cart = [];
  updateCartDisplay();
  
  // Optional: Add any order processing logic here
  console.log('Order submitted');
}

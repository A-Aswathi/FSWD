const products = [
    { id: 1, name: "Used Bike", description: "A well-maintained bike.", condition: "Good", seller: "John Doe", rating: 4, date: new Date().toLocaleString(), imageUrl: "path/to/bike-image.jpg" },
    { id: 2, name: "Secondhand Laptop", description: "A powerful laptop for students.", condition: "Like New", seller: "Jane Smith", rating: 5, date: new Date().toLocaleString(), imageUrl: "path/to/laptop-image.jpg" },
    { id: 3, name: "Vintage Camera", description: "Perfect for photography enthusiasts.", condition: "Fair", seller: "Sam Brown", rating: 3, date: new Date().toLocaleString(), imageUrl: "path/to/camera-image.jpg" },
    { id: 4, name: "Old Books Collection", description: "A collection of classic novels.", condition: "Good", seller: "Emily White", rating: 4, date: new Date().toLocaleString(), imageUrl: "path/to/books-image.jpg" },
    { id: 5, name: "Gaming Console", description: "Used gaming console with games.", condition: "Good", seller: "Mike Johnson", rating: 5, date: new Date().toLocaleString(), imageUrl: "path/to/console-image.jpg" },
    { id: 6, name: "Mountain Bike", description: "Perfect for adventure seekers.", condition: "Good", seller: "Sarah Parker", rating: 4, date: new Date().toLocaleString(), imageUrl: "path/to/mountain-bike-image.jpg" },
    { id: 7, name: "Smartphone", description: "Latest model in excellent condition.", condition: "Like New", seller: "Chris Green", rating: 5, date: new Date().toLocaleString(), imageUrl: "path/to/smartphone-image.jpg" },
    { id: 8, name: "Table and Chairs", description: "Solid wood furniture set.", condition: "Fair", seller: "Nancy Wilson", rating: 3, date: new Date().toLocaleString(), imageUrl: "path/to/table-chairs-image.jpg" },
    { id: 9, name: "Bicycle", description: "Ideal for city commuting.", condition: "Good", seller: "David Brown", rating: 4, date: new Date().toLocaleString(), imageUrl: "path/to/bicycle-image.jpg" },
    { id: 10, name: "Old Vinyl Records", description: "Classic music collection.", condition: "Good", seller: "Anna Bell", rating: 4, date: new Date().toLocaleString(), imageUrl: "path/to/vinyl-records-image.jpg" }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function saveOrderHistory() {
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
}

function redirectToHome(event) {
    event.preventDefault();
    document.getElementById('login').classList.add('hidden');
    document.getElementById('home').classList.remove('hidden');
    document.getElementById('logout-link').classList.remove('hidden');
    loadProducts();
}

function loadProducts() {
    const container = document.getElementById('products-container');
    container.innerHTML = ''; // Clear previous products
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}" class="product-image" />
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Condition: ${product.condition}</p>
            <p>Seller: ${product.seller}</p>
            <p>Posted on: ${product.date}</p>
            <p>Rating: ${'⭐'.repeat(product.rating)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
            <button onclick="viewProductDetails(${product.id})">View Details</button>
        `;
        container.appendChild(productDiv);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    saveCart();
    document.getElementById('cart-count').innerText = cart.length;
    alert(`${product.name} added to cart!`);
}

function viewProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    const detailsDiv = document.getElementById('product-details');
    detailsDiv.innerHTML = `
        <img src="${product.imageUrl}" alt="${product.name}" class="product-image" />
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <p>Condition: ${product.condition}</p>
        <p>Seller: ${product.seller}</p>
        <p>Posted on: ${product.date}</p>
        <p>Rating: ${'⭐'.repeat(product.rating)}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
        <button onclick="goBackToHome()">Back to Products</button>
    `;
    detailsDiv.classList.remove('hidden');
}

function goBackToHome() {
    document.getElementById('home').classList.remove('hidden');
    document.getElementById('product-details').classList.add('hidden');
    document.getElementById('cart').classList.add('hidden');
    document.getElementById('checkout').classList.add('hidden');
    document.getElementById('order-confirmation').classList.add('hidden');
    document.getElementById('order-history').classList.add('hidden');
    loadProducts();
}

function checkout() {
    document.getElementById('cart').classList.remove('hidden');
    document.getElementById('home').classList.add('hidden');
    displayCartItems();
}

function displayCartItems() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';
    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'order';
        itemDiv.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}" class="cart-item-image" />
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsDiv.appendChild(itemDiv);
    });
    document.getElementById('cart-count').innerText = cart.length;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    displayCartItems();
    alert('Product removed from cart.');
}

function placeOrder(event) {
    event.preventDefault();
    const orderDetails = {
        name: document.getElementById('user-name').value,
        phone: document.getElementById('user-phone').value,
        address: document.getElementById('user-address').value,
        email: document.getElementById('user-email').value,
        items: cart,
        date: new Date().toLocaleString()
    };

    // Add order to history
    orderHistory.push(orderDetails);
    saveOrderHistory();

    // Clear the cart
    cart = [];
    saveCart();

    // Populate order confirmation details
    document.getElementById('order-details').innerHTML = `
        <p>Thank you for your order, ${orderDetails.name}!</p>
        <p>Order Date: ${orderDetails.date}</p>
        <h3>Delivery Address:</h3>
        <p>${orderDetails.address}</p>
        <h3>Items:</h3>
        <ul>
            ${orderDetails.items.map(item => `<li>${item.name}</li>`).join('')}
        </ul>
    `;

    // Hide the checkout and show order confirmation
    document.getElementById('checkout').classList.add('hidden');
    document.getElementById('order-confirmation').classList.remove('hidden');
    document.getElementById('order-history').classList.add('hidden');

    // Redirect to order confirmation page (optional: can be a separate HTML page)
    setTimeout(() => {
        window.location.href = 'order-confirmation.html'; // Redirect to the confirmation page
    }, 3000); // Redirect after 3 seconds
}

function viewOrderHistory() {
    const orderHistoryDiv = document.getElementById('order-history-items');
    orderHistoryDiv.innerHTML = '';
    orderHistory.forEach(order => {
        const orderDiv = document.createElement('div');
        orderDiv.className = 'order';
        orderDiv.innerHTML = `
            <h3>Order on ${order.date}</h3>
            <p>Name: ${order.name}</p>
            <p>Phone: ${order.phone}</p>
            <p>Address: ${order.address}</p>
            <h4>Items:</h4>
            <ul>
                ${order.items.map(item => `<li>${item.name}</li>`).join('')}
            </ul>
        `;
        orderHistoryDiv.appendChild(orderDiv);
    });
    document.getElementById('order-history').classList.remove('hidden');
    document.getElementById('home').classList.add('hidden');
}

document.getElementById('cart-link').onclick = checkout;
document.getElementById('order-history-link').onclick = viewOrderHistory;

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('cart-count').innerText = cart.length;
});

function placeOrder(event) {
    event.preventDefault();
    const orderDetails = {
        name: document.getElementById('user-name').value,
        phone: document.getElementById('user-phone').value,
        address: document.getElementById('user-address').value,
        email: document.getElementById('user-email').value,
        items: cart,
        date: new Date().toLocaleString()
    };

    // Add order to history
    orderHistory.push(orderDetails);
    saveOrderHistory();

    // Clear the cart
    cart = [];
    saveCart();

    // Save last order to local storage for confirmation page
    localStorage.setItem('lastOrder', JSON.stringify(orderDetails));

    // Redirect to order confirmation page
    window.location.href = 'order-confirmation.html'; // Redirect to the confirmation page
}

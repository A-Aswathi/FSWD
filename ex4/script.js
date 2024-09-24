const menuItems = [
    { id: 1, name: "Margherita Pizza", price: 12.99, category: "Pizza" },
    { id: 2, name: "Pepperoni Pizza", price: 14.99, category: "Pizza" },
    { id: 3, name: "Caesar Salad", price: 9.99, category: "Salad" },
    { id: 4, name: "Spaghetti Carbonara", price: 13.99, category: "Pasta" },
    { id: 5, name: "Cheeseburger", price: 11.99, category: "Burger" },
];

const cart = JSON.parse(localStorage.getItem('cart')) || [];
let user = null;

function renderMenu() {
    const menuList = document.getElementById("menu-items");
    menuList.innerHTML = ""; // Clear the list
    menuItems.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.name} - $${item.price.toFixed(2)} 
            <button onclick="addToCart(${item.id})">Add to Cart</button>
        `;
        menuList.appendChild(li);
    });
}

function addToCart(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    const cartItem = cart.find(i => i.id === itemId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function renderCart() {
    const cartList = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    
    cartList.innerHTML = "";
    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.name} - $${item.price.toFixed(2)} x 
            <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
        `;
        cartList.appendChild(li);
    });

    totalPriceElement.innerText = totalPrice.toFixed(2);
}

function updateQuantity(itemId, quantity) {
    const cartItem = cart.find(i => i.id === itemId);
    if (cartItem) {
        cartItem.quantity = parseInt(quantity);
        if (cartItem.quantity <= 0) {
            removeFromCart(itemId);
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

function removeFromCart(itemId) {
    const index = cart.findIndex(i => i.id === itemId);
    if (index !== -1) {
        cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

document.getElementById("place-order").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    let orderSummary = "Your Order:\n";
    cart.forEach(item => {
        orderSummary += `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}\n`;
    });
    orderSummary += `Total: $${document.getElementById("total-price").innerText}`;

    if (confirm(orderSummary + "\nDo you want to place this order?")) {
        alert("Order placed successfully!");
        cart.length = 0; // Clear the cart
        localStorage.removeItem('cart'); // Clear local storage
        renderCart(); // Update cart display
    }
});

document.getElementById("clear-cart").addEventListener("click", () => {
    cart.length = 0; // Clear the cart
    localStorage.removeItem('cart'); // Clear local storage
    renderCart(); // Update cart display
});

document.getElementById("auth-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    user = { username, password };
    alert("Logged in successfully!");
    document.getElementById("auth-section").style.display = "none";
    renderMenu();
});

document.getElementById("toggle-dark-mode").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

function filterMenu() {
    const searchQuery = document.getElementById("search").value.toLowerCase();
    const filteredItems = menuItems.filter(item => 
        item.name.toLowerCase().includes(searchQuery)
    );
    renderFilteredMenu(filteredItems);
}

function renderFilteredMenu(filteredItems


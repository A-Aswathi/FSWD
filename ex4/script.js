const menuItems = [
    { id: 1, name: "Margherita Pizza", price: 12.99 },
    { id: 2, name: "Pepperoni Pizza", price: 14.99 },
    { id: 3, name: "Caesar Salad", price: 9.99 },
    { id: 4, name: "Spaghetti Carbonara", price: 13.99 },
    { id: 5, name: "Cheeseburger", price: 11.99 },
];

const cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderMenu() {
    const menuList = document.getElementById("menu-items");
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
        li.innerHTML = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`;
        cartList.appendChild(li);
    });

    totalPriceElement.innerText = totalPrice.toFixed(2);
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

// Clear Cart Button
const clearCartButton = document.createElement('button');
clearCartButton.textContent = 'Clear Cart';
clearCartButton.onclick = () => {
    cart.length = 0; // Clear the cart
    localStorage.removeItem('cart'); // Clear local storage
    renderCart(); // Update cart display
};

document.querySelector('.cart').appendChild(clearCartButton);

// Initial rendering of the menu and cart
renderMenu();
renderCart();

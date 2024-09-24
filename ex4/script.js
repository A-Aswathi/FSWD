const menuItems = [
    { id: 1, name: "Margherita Pizza", price: 12.99 },
    { id: 2, name: "Pepperoni Pizza", price: 14.99 },
    { id: 3, name: "Caesar Salad", price: 9.99 },
    { id: 4, name: "Spaghetti Carbonara", price: 13.99 },
    { id: 5, name: "Cheeseburger", price: 11.99 },
];

const cart = [];

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

    alert("Order placed successfully!");
    cart.length = 0; // Clear the cart
    renderCart(); // Update cart display
});

// Initial rendering of the menu
renderMenu();

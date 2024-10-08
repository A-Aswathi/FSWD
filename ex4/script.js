const restaurants = [
    {
        id: 1,
        name: "Italian Bistro",
        menuItems: [
            { id: 1, name: "Margherita Pizza", price: 12.99 },
            { id: 2, name: "Pepperoni Pizza", price: 14.99 },
            { id: 3, name: "Caesar Salad", price: 9.99 },
            { id: 4, name: "Spaghetti Carbonara", price: 13.99 },
            { id: 5, name: "Tiramisu", price: 6.99 },
        ]
    },
    {
        id: 2,
        name: "Burger Palace",
        menuItems: [
            { id: 6, name: "Cheeseburger", price: 11.99 },
            { id: 7, name: "Veggie Burger", price: 10.99 },
            { id: 8, name: "Fries", price: 3.99 },
            { id: 9, name: "Onion Rings", price: 4.99 },
            { id: 10, name: "Milkshake", price: 5.99 },
        ]
    },
    {
        id: 3,
        name: "Sushi Spot",
        menuItems: [
            { id: 11, name: "California Roll", price: 8.99 },
            { id: 12, name: "Spicy Tuna Roll", price: 9.99 },
            { id: 13, name: "Miso Soup", price: 3.99 },
            { id: 14, name: "Sashimi Platter", price: 15.99 },
            { id: 15, name: "Green Tea Ice Cream", price: 4.99 },
        ]
    },
    // Add more restaurants and items here...
    {
        id: 4,
        name: "Mexican Fiesta",
        menuItems: [
            { id: 16, name: "Tacos", price: 9.99 },
            { id: 17, name: "Burrito", price: 10.99 },
            { id: 18, name: "Nachos", price: 8.99 },
            { id: 19, name: "Quesadilla", price: 7.99 },
            { id: 20, name: "Churros", price: 5.99 },
        ]
    },
    {
        id: 5,
        name: "Indian Spice",
        menuItems: [
            { id: 21, name: "Butter Chicken", price: 13.99 },
            { id: 22, name: "Vegetable Curry", price: 11.99 },
            { id: 23, name: "Naan", price: 2.99 },
            { id: 24, name: "Biryani", price: 12.99 },
            { id: 25, name: "Gulab Jamun", price: 4.99 },
        ]
    },
    {
        id: 6,
        name: "Pizza Haven",
        menuItems: [
            { id: 26, name: "Hawaiian Pizza", price: 14.99 },
            { id: 27, name: "BBQ Chicken Pizza", price: 15.99 },
            { id: 28, name: "Vegetarian Pizza", price: 13.49 },
            { id: 29, name: "Meat Lovers Pizza", price: 16.99 },
            { id: 30, name: "Garlic Knots", price: 5.99 },
        ]
    },
    {
        id: 7,
        name: "Dessert Delights",
        menuItems: [
            { id: 31, name: "Chocolate Cake", price: 4.99 },
            { id: 32, name: "Cheesecake", price: 5.99 },
            { id: 33, name: "Pavlova", price: 6.99 },
            { id: 34, name: "Macarons", price: 7.99 },
            { id: 35, name: "Fruit Tart", price: 5.49 },
        ]
    },
    {
        id: 8,
        name: "Steak House",
        menuItems: [
            { id: 36, name: "Ribeye Steak", price: 24.99 },
            { id: 37, name: "Filet Mignon", price: 29.99 },
            { id: 38, name: "Grilled Salmon", price: 21.99 },
            { id: 39, name: "Stuffed Mushrooms", price: 10.99 },
            { id: 40, name: "Caesar Salad", price: 8.99 },
        ]
    },
    {
        id: 9,
        name: "Vegan Bistro",
        menuItems: [
            { id: 41, name: "Vegan Burger", price: 11.99 },
            { id: 42, name: "Quinoa Salad", price: 9.99 },
            { id: 43, name: "Tofu Stir Fry", price: 12.99 },
            { id: 44, name: "Vegan Pizza", price: 13.49 },
            { id: 45, name: "Coconut Bliss", price: 6.49 },
        ]
    },
    {
        id: 10,
        name: "Breakfast Nook",
        menuItems: [
            { id: 46, name: "Pancakes", price: 7.99 },
            { id: 47, name: "Omelette", price: 8.99 },
            { id: 48, name: "Fruit Salad", price: 6.99 },
            { id: 49, name: "Avocado Toast", price: 9.99 },
            { id: 50, name: "Smoothie Bowl", price: 7.49 },
        ]
    }
    
];

const cart = JSON.parse(localStorage.getItem('cart')) || [];
const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];

// Function to render the restaurant menu
function renderMenu() {
    const menuList = document.getElementById("menu-items");
    menuList.innerHTML = ''; // Clear existing menu items
    restaurants.forEach(restaurant => {
        const restaurantHeader = document.createElement("h3");
        restaurantHeader.innerText = restaurant.name;

        // Add click event to toggle menu items
        restaurantHeader.onclick = () => {
            const menuItems = document.getElementById(`menu-items-${restaurant.id}`);
            menuItems.style.display = menuItems.style.display === 'none' ? 'block' : 'none';
        };

        menuList.appendChild(restaurantHeader);

        // Create a UL for menu items
        const menuItemsList = document.createElement("ul");
        menuItemsList.id = `menu-items-${restaurant.id}`;
        menuItemsList.style.display = 'none'; // Start hidden

        restaurant.menuItems.forEach(item => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${item.name} - $${item.price.toFixed(2)} 
                <button onclick="addToCart(${item.id})">Add to Cart</button>
            `;
            menuItemsList.appendChild(li);
        });

        menuList.appendChild(menuItemsList); // Add menu items list to the menu list
    });
}

// Function to add items to the cart
function addToCart(itemId) {
    const item = restaurants.flatMap(r => r.menuItems).find(i => i.id === itemId);
    const cartItem = cart.find(i => i.id === itemId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

// Function to render the cart
function renderCart() {
    const cartList = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const cartActions = document.querySelector('.cart-actions');
    
    cartList.innerHTML = "";
    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;
        const li = document.createElement("li");
        li.innerHTML = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`;
        cartList.appendChild(li);
    });

    totalPriceElement.innerText = totalPrice.toFixed(2);
    cartActions.style.display = cart.length > 0 ? 'block' : 'none';
}

// Function to render order history
function renderOrderHistory() {
    const orderHistoryList = document.getElementById("order-history-list");
    orderHistoryList.innerHTML = ""; // Clear existing order history

    orderHistory.forEach(order => {
        const li = document.createElement("li");
        li.innerHTML = `Order on ${order.date}: Total $${order.total}`;
        orderHistoryList.appendChild(li);
    });
}

// Event listener for placing an order
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

        // Add to order history
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        orderHistory.push({
            total: totalPrice.toFixed(2),
            date: new Date().toLocaleString()
        });

        localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
        cart.length = 0; // Clear the cart
        localStorage.removeItem('cart'); // Clear local storage
        renderCart(); // Update cart display
        renderOrderHistory(); // Update order history display
    }
});

// Clear Cart Button
document.getElementById('clear-cart').addEventListener('click', () => {
    if (confirm("Are you sure you want to clear the cart?")) {
        cart.length = 0; // Clear the cart
        localStorage.removeItem('cart'); // Clear local storage
        renderCart(); // Update cart display
    }
});

// Initialize menu, cart, and order history on page load
renderMenu();
renderCart();
renderOrderHistory();


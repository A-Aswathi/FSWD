let cart = [];

// Sample restaurant data
const restaurants = [
    {
        name: 'Pizza Place',
        cuisine: 'Italian',
        menu: [
            { name: 'Margherita Pizza', price: 10 },
            { name: 'Pepperoni Pizza', price: 12 },
        ],
    },
    {
        name: 'Burger Joint',
        cuisine: 'American',
        menu: [
            { name: 'Cheeseburger', price: 8 },
            { name: 'Veggie Burger', price: 7 },
        ],
    },
    {
        name: 'Sushi Spot',
        cuisine: 'Japanese',
        menu: [
            { name: 'California Roll', price: 8 },
            { name: 'Tuna Sashimi', price: 12 },
        ],
    },
];

// Fetch restaurants and display them
function displayRestaurants() {
    const restaurantList = document.getElementById('restaurantList');

    restaurants.forEach(restaurant => {
        const div = document.createElement('div');
        div.className = 'restaurant';
        div.innerHTML = `
            <h3>${restaurant.name}</h3>
            <p>Cuisine: ${restaurant.cuisine}</p>
            <h4>Menu</h4>
            <ul>
                ${restaurant.menu.map(item => `
                    <li>${item.name} - $${item.price}
                    <button onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>
                    </li>`).join('')}
            </ul>
        `;
        restaurantList.appendChild(div);
    });
}

// Add items to the cart
function addToCart(itemName, itemPrice) {
    cart.push({ name: itemName, price: itemPrice });
    updateCartDisplay();
}

// Update cart display
function updateCartDisplay() {
    const cartList = document.getElementById('cart');
    cartList.innerHTML = '';

    if (cart.length === 0) {
        cartList.innerHTML = '<p>Your cart is empty.</p>';
        document.getElementById('total').innerText = '';
        return;
    }

    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        cartList.innerHTML += `
            <li>${item.name} - $${item.price}
            <button onclick="removeFromCart(${index})">Remove</button>
            </li>`;
    });

    document.getElementById('total').innerText = `Total: $${total}`;
}

// Remove items from the cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

// Call the function to display restaurants when the page loads
window.onload = displayRestaurants;

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartList.innerHTML += `<p>Total: $${total}</p>`;
}

// Sample menus for each restaurant
const menus = {
    "Pizza Place": [
        { name: "Margherita Pizza", price: 10 },
        { name: "Pepperoni Pizza", price: 12 },
        { name: "BBQ Chicken Pizza", price: 14 }
    ],
    "Burger Joint": [
        { name: "Cheeseburger", price: 8 },
        { name: "Veggie Burger", price: 7 },
        { name: "Double Burger", price: 10 }
    ],
    "Sushi Spot": [
        { name: "California Roll", price: 8 },
        { name: "Tuna Sashimi", price: 12 },
        { name: "Tempura Roll", price: 10 }
    ]
};

// Cart array to hold selected items
let cart = [];

// Function to display the menu for the selected restaurant
function viewMenu(restaurant) {
    const menu = menus[restaurant];
    if (menu) {
        let menuList = `<h2>${restaurant} Menu</h2><ul>`;
        menu.forEach(item => {
            menuList += `<li>${item.name} - $${item.price} 
                <button onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>
            </li>`;
        });
        menuList += '</ul>';
        document.getElementById('menuDisplay').innerHTML = menuList;
    } else {
        alert('Menu not found.');
    }
}

// Function to add items to the cart
function addToCart(itemName, itemPrice) {
    const item = { name: itemName, price: itemPrice };
    cart.push(item);
    updateCartDisplay();
}

// Function to remove items from the cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

// Function to update cart display
function updateCartDisplay() {
    const cartList = document.getElementById('cart');
    cartList.innerHTML = '';
    
    if (cart.length === 0) {
        cartList.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cart.forEach((item, index) => {
        cartList.innerHTML += `
            <li>${item.name} - $${item.price} 
                <button onclick="removeFromCart(${index})">Remove</button>
            </li>`;
    });

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartList.innerHTML += `<p>Total: $${total}</p>`;
}

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

// Function to display the menu for the selected restaurant
function viewMenu(restaurant) {
    const menu = menus[restaurant];
    if (menu) {
        let menuList = `<h2>${restaurant} Menu</h2><ul>`;
        menu.forEach(item => {
            menuList += `<li>${item.name} - $${item.price}</li>`;
        });
        menuList += '</ul>';
        alert(menuList);
    } else {
        alert('Menu not found.');
    }
}


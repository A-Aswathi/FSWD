let loggedIn = false;

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username && password) {
        loggedIn = true;
        document.getElementById("login-page").classList.add("hidden");
        document.getElementById("home-page").classList.remove("hidden");
        loadProducts();
    } else {
        alert("Please enter both username and password.");
    }
}

const products = [];

function addProduct() {
    const name = document.getElementById("product-name").value;
    const image = document.getElementById("product-image").value;
    const condition = document.getElementById("product-condition").value;
    const address = document.getElementById("delivery-address").value;
    const rating = document.getElementById("product-rating").value;

    if (name && image && condition && address && rating) {
        const product = {
            name,
            image,
            condition,
            address,
            rating,
            date: new Date().toLocaleString()
        };
        products.push(product);
        displayProducts();
        clearProductForm();
    } else {
        alert("Please fill out all fields.");
    }
}

function displayProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = ''; // Clear existing products
    products.forEach(product => {
        productList.innerHTML += `
            <div class="product">
                <h4>${product.name}</h4>
                <img src="${product.image}" alt="${product.name}" />
                <p>Condition: ${product.condition}</p>
                <p>Delivery Address: ${product.address}</p>
                <p>Rating: ${product.rating}</p>
                <p>Uploaded on: ${product.date}</p>
            </div>
        `;
    });
}

function clearProductForm() {
    document.getElementById("product-name").value = '';
    document.getElementById("product-image").value = '';
    document.getElementById("product-condition").value = '';
    document.getElementById("delivery-address").value = '';
    document.getElementById("product-rating").value = '';
}

function loadProducts() {
    // Placeholder for loading products if needed
}


const products = [
    { id: 1, name: "Headphones", price: 49 },
    { id: 2, name: "Smart Watch", price: 99 },
    { id: 3, name: "Shoes", price: 79 },
    { id: 4, name: "Backpack", price: 59 }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const totalEl = document.getElementById("total");

/* Load Products */
if (productList) {
    products.forEach(p => {
        productList.innerHTML += `
            <div class="product">
                <img src="https://via.placeholder.com/200">
                <h3>${p.name}</h3>
                <p>$${p.price}</p>
                <button onclick="addToCart(${p.id})">Add to Cart</button>
            </div>
        `;
    });
}

/* Cart Functions */
function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateCart();
}

function updateCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    cartCount.innerText = cart.length;

    if (!cartItems) return;

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price;
        cartItems.innerHTML += `<p>${item.name} - $${item.price}</p>`;
    });

    totalEl.innerText = total;
}

function toggleCart() {
    document.getElementById("cart").classList.toggle("active");
}

updateCart();

/* Search */
const search = document.getElementById("search");
if (search) {
    search.addEventListener("keyup", () => {
        const value = search.value.toLowerCase();
        document.querySelectorAll(".product").forEach(p => {
            p.style.display = p.innerText.toLowerCase().includes(value)
                ? "block"
                : "none";
        });
    });
}

/* Checkout */
function placeOrder(e) {
    e.preventDefault();
    localStorage.removeItem("cart");
    document.getElementById("order-msg").innerText =
        "✅ Order placed successfully!";
}

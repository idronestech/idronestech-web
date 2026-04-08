// SECTION 1: ADD TO CART LOGIC
// Use this on your product pages (e.g., Matrice 350 page)
function addToCart(productName, price) {
    // 1. Get current cart from browser memory (LocalStorage)
    // If empty, start with a fresh list []
    let cart = JSON.parse(localStorage.getItem('idronesCart')) || [];

    // 2. Create the item object
    let item = {
        name: productName,
        price: parseFloat(price),
        dateAdded: new Date().toLocaleDateString()
    };

    // 3. Add to the list and save back to memory
    cart.push(item);
    localStorage.setItem('idronesCart', JSON.stringify(cart));

    // 4. Visual confirmation for the customer
    alert(`${productName} has been added to your cart!`);
    
    // Optional: Refresh the page or update a counter
    updateCartCounter();
}

// SECTION 2: CALCULATION LOGIC
// Use this on your Checkout page to show the total
function calculateCartTotal() {
    let cart = JSON.parse(localStorage.getItem('idronesCart')) || [];
    let total = 0;

    cart.forEach(item => {
        total += item.price;
    });

    return total.toFixed(2); // Returns total like "4500.00"
}

// SECTION 3: DISPLAY LOGIC (FOR TESTING)
// This prints the cart contents to your browser console
function debugCart() {
    let cart = JSON.parse(localStorage.getItem('idronesCart')) || [];
    console.log("--- iDronestech Current Cart ---");
    console.table(cart);
    console.log("Total Order Value: $" + calculateCartTotal());
}

// SECTION 4: CART COUNTER (EXTRA)
// Call this function in your header to show how many items are in the cart
function updateCartCounter() {
    let cart = JSON.parse(localStorage.getItem('idronesCart')) || [];
    let counterElement = document.getElementById('cart-count');
    if (counterElement) {
        counterElement.innerText = cart.length;
    }
    
}
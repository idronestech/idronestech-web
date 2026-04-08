/**
 * iDronestech - Full Integrated Cart System
 * Includes: Advanced Grouping, Auto-Fill, and Form Validation Fixes
 */

// 1. ADD TO BASKET LOGIC
function addToCart(productName, price) {
    let cart = JSON.parse(localStorage.getItem('idronesCart')) || [];

    let item = {
        name: productName,
        price: parseFloat(price),
        id: Date.now() 
    };

    cart.push(item);
    localStorage.setItem('idronesCart', JSON.stringify(cart));
    alert(productName + " has been added to your cart!");
}

// 2. CALCULATION LOGIC
function calculateCartTotal() {
    let cart = JSON.parse(localStorage.getItem('idronesCart')) || [];
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    return total.toFixed(2);
}

// 3. REMOVAL LOGIC
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem('idronesCart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('idronesCart', JSON.stringify(cart));
    
    // Refresh both UI sections
    renderCartOnPage(); 
    syncCartWithForm(); 
}

// 4. SUMMARY DISPLAY (Top of Checkout Page)
function renderCartOnPage() {
    const listContainer = document.getElementById('cart-items-list');
    const totalElement = document.getElementById('cart-total-price');

    if (!listContainer || !totalElement) return;

    let cart = JSON.parse(localStorage.getItem('idronesCart')) || [];

    if (cart.length > 0) {
        listContainer.innerHTML = ''; 
        cart.forEach((item, index) => {
            listContainer.innerHTML += `
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; padding: 10px 0;">
                    <div>
                        <span style="font-weight: 600; color: #333;">${item.name}</span><br>
                        <button onclick="removeItem(${index})" style="background:none; border:none; color:#ff4d4d; cursor:pointer; font-size:12px; padding:0;">Remove</button>
                    </div>
                    <span style="color: #2e7d32; font-weight: bold;">£${item.price.toFixed(2)}</span>
                </div>`;
        });
        totalElement.innerText = calculateCartTotal();
    } else {
        listContainer.innerHTML = '<p style="color:#888;">Your basket is empty.</p>';
        totalElement.innerText = "0.00";
    }
}

// 5. PRO-GROUPED FORM SYNC (Matches your Checkout Page HTML)
function syncCartWithForm() {
    let cart = JSON.parse(localStorage.getItem('idronesCart')) || [];
    
    // HTML Element Mapping
    const nameInput = document.getElementById('form-product-name');
    const qtyInput = document.getElementById('form-product-qty');
    const priceInput = document.getElementById('form-product-price');
    const totalInput = document.getElementById('form-total-bill');
    const submitBtn = document.getElementById('submit-btn');

    if (cart.length > 0) {
        // --- PRO LOGIC: Grouping Duplicates ---
        const counts = {};
        cart.forEach(item => {
            counts[item.name] = (counts[item.name] || 0) + 1;
        });

        // Creates professional string: "3x DJI Avata 2..."
        const productSummary = Object.entries(counts)
            .map(([name, count]) => (count > 1 ? `${count}x ${name}` : name))
            .join(", ");

        // Auto-populate the Read-Only fields
        if(nameInput) nameInput.value = productSummary;
        if(qtyInput) qtyInput.value = cart.length + " Total Item(s)";
        
        // VALIDATION FIX: Ensure this is NEVER empty to prevent "Required" errors
        if(priceInput) priceInput.value = "See Total Below"; 
        
        if(totalInput) totalInput.value = "£" + calculateCartTotal();
        
        // Unlock Submit Button
        if(submitBtn) {
            submitBtn.disabled = false;
            submitBtn.style.opacity = "1";
            submitBtn.style.cursor = "pointer";
            submitBtn.innerText = "Submit Order";
        }
    } else {
        // Reset State if Empty
        if(nameInput) nameInput.value = "";
        if(qtyInput) qtyInput.value = "";
        if(priceInput) priceInput.value = "";
        if(totalInput) totalInput.value = "£0.00";
        if(submitBtn) {
            submitBtn.disabled = true;
            submitBtn.style.opacity = "0.5";
            submitBtn.style.cursor = "not-allowed";
            submitBtn.innerText = "Add items to basket";
        }
    }
}

// 6. INITIALIZE ON LOAD
document.addEventListener('DOMContentLoaded', () => {
    renderCartOnPage();
    syncCartWithForm();
});
// Sirf Cart aur Menu logic rakhein
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const countEl = document.getElementById('cart-count');
    if (countEl) countEl.innerText = cart.length;
}

// Page load par count update karein
updateCartCount();


// Baki ka search ya filter logic yahan rehne dein...

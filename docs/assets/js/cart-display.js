// cart-display.js - Utilizza la classe Cart per gestire la visualizzazione
document.addEventListener('DOMContentLoaded', () => {
    const cart = new Cart();
    
    // Aggiorna il carrello nella pagina corrente
    if (document.querySelector('.cart-items')) {
        cart.updateCartDisplay();
    }
    
    // Aggiorna il contatore del carrello in tutte le pagine
    cart.updateCartCount();
});
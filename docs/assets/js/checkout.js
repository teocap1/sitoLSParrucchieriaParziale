// checkout.js
document.addEventListener('DOMContentLoaded', () => {
    const cart = new Cart();
    const checkoutForm = document.getElementById('checkout-form');
    
    if (checkoutForm) {
        // Mostra gli elementi del carrello nella pagina di checkout
        const checkoutCartItems = document.querySelector('.checkout-section .cart-items');
        if (checkoutCartItems) {
            checkoutCartItems.innerHTML = '';
            if (cart.items.length === 0) {
                checkoutCartItems.innerHTML = '<p>Il tuo carrello è vuoto</p>';
            } else {
                cart.items.forEach(item => {
                    const itemTotal = item.price * item.quantity;
                    checkoutCartItems.innerHTML += `
                        <div class="cart-item">
                            <img src="${item.image}" alt="${item.name}" width="60">
                            <div class="item-details">
                                <h4>${item.name}</h4>
                                <p>${item.brand}</p>
                                <div class="item-controls">
                                    <span>Quantità: ${item.quantity}</span>
                                    <span class="item-price">€${itemTotal.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    `;
                });
            }
            
            // Aggiorna il totale
            const total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            document.querySelector('.checkout-section .cart-total').textContent = `€${total.toFixed(2)}`;
        }

        checkoutForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Validazione dei campi
            const name = document.getElementById('checkout-name').value;
            const email = document.getElementById('checkout-email').value;
            const phone = document.getElementById('checkout-phone').value;
            const address = document.getElementById('checkout-address').value;
            const city = document.getElementById('checkout-city').value;
            const zip = document.getElementById('checkout-zip').value;
            const province = document.getElementById('checkout-province').value;
            const deliveryMethod = document.getElementById('delivery-method').value;
            const notes = document.getElementById('checkout-notes').value;
            
            if (!name || !email || !phone || !address || !city || !zip || !province || !deliveryMethod) {
                alert('Per favore, compila tutti i campi obbligatori');
                return;
            }
            
            // Genera un codice ordine alfanumerico casuale
            const orderNumber = generateOrderNumber();
            
            // Crea il messaggio per WhatsApp
            let whatsappMessage = `Nuovo ordine #${orderNumber}%0A%0A`;
            whatsappMessage += `*Cliente:* ${name}%0A`;
            whatsappMessage += `*Telefono:* ${phone}%0A`;
            whatsappMessage += `*Email:* ${email}%0A`;
            whatsappMessage += `*Indirizzo:* ${address}, ${zip} ${city} (${province})%0A`;
            whatsappMessage += `*Metodo di ritiro:* ${deliveryMethod === 'pickup' ? 'Ritiro in sede' : 'Consegna a domicilio'}%0A`;
            
            if (notes) {
                whatsappMessage += `*Note:* ${notes}%0A`;
            }
            
            whatsappMessage += `%0A*Riepilogo ordine:*%0A`;
            
            cart.items.forEach(item => {
                whatsappMessage += `- ${item.name} (${item.brand}) x${item.quantity}: €${(item.price * item.quantity).toFixed(2)}%0A`;
            });
            
            const total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            whatsappMessage += `%0A*Totale:* €${total.toFixed(2)}%0A%0A`;
            whatsappMessage += `Confermare l'ordine e comunicare al cliente quando è pronto.`;
            
            // Salva l'ordine nel localStorage per la pagina di conferma
            const orderData = {
                orderNumber: orderNumber,
                customer: { name, email, phone, address, city, zip, province },
                deliveryMethod,
                notes,
                items: cart.items,
                total: total
            };
            
            localStorage.setItem('lastOrder', JSON.stringify(orderData));
            
            // Svuota il carrello
            cart.items = [];
            cart.saveCart();
            
            // Apri WhatsApp con il messaggio precompilato
            window.open(`https://wa.me/393517125743?text=${whatsappMessage}`, '_blank');
            
            // Reindirizza alla pagina di conferma
            window.location.href = "order-confirmation.html";
        });
    }
});

// Funzione per generare un codice ordine alfanumerico casuale
function generateOrderNumber() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'ORD-';
    for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}
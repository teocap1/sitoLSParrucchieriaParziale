// Gestione carrello
class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.updateCart();
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({...product, quantity: 1});
        }
        this.saveCart();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
            this.saveCart();
        }
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
        this.updateCart();
    }

    updateCart() {
        this.updateCartCount();
        this.updateCartDisplay();
    }

    updateCartCount() {
        const count = this.items.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelectorAll('.cart-count').forEach(el => {
            el.textContent = count;
            el.style.display = count > 0 ? 'inline-block' : 'none';
        });
    }

    updateCartDisplay() {
        // Aggiorna la visualizzazione del carrello se siamo nella pagina del carrello
        const cartContainer = document.querySelector('.cart-items');
        const cartTotal = document.querySelector('.cart-total');
        
        if (!cartContainer) return;

        if (this.items.length === 0) {
            cartContainer.innerHTML = '<p>Il tuo carrello è vuoto</p>';
            if (cartTotal) cartTotal.textContent = '€0.00';
            return;
        }

        let total = 0;
        cartContainer.innerHTML = this.items.map(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            return `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" width="80">
                    <div class="item-details">
                        <h4>${item.name}</h4>
                        <p>${item.brand}</p>
                        <div class="item-controls">
                            <button class="btn btn-small decrease" data-id="${item.id}">-</button>
                            <span>${item.quantity}</span>
                            <button class="btn btn-small increase" data-id="${item.id}">+</button>
                            <span class="item-price">€${itemTotal.toFixed(2)}</span>
                        </div>
                    </div>
                    <button class="btn btn-small remove" data-id="${item.id}">Rimuovi</button>
                </div>
            `;
        }).join('');

        if (cartTotal) cartTotal.textContent = `€${total.toFixed(2)}`;

        // Aggiungi event listeners per i pulsanti
        this.addCartEventListeners();
    }

    addCartEventListeners() {
        document.querySelectorAll('.increase').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemId = e.target.dataset.id;
                const item = this.items.find(i => i.id === itemId);
                if (item) {
                    item.quantity += 1;
                    this.saveCart();
                }
            });
        });

        document.querySelectorAll('.decrease').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemId = e.target.dataset.id;
                const item = this.items.find(i => i.id === itemId);
                if (item && item.quantity > 1) {
                    item.quantity -= 1;
                    this.saveCart();
                }
            });
        });

        document.querySelectorAll('.remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemId = e.target.dataset.id;
                this.removeItem(itemId);
            });
        });
    }
}

// Inizializza il carrello
const cart = new Cart();

// Aggiungi al carrello
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.btn-small').forEach(btn => {
        if (btn.textContent.includes('Aggiungi')) {
            btn.addEventListener('click', function() {
                const productCard = this.closest('.product-item');
                const product = {
                    id: productCard.dataset.id || Math.random().toString(36).substr(2, 9),
                    name: productCard.querySelector('h3').textContent,
                    price: parseFloat(productCard.querySelector('.price').textContent.replace('€', '').replace(',', '.')),
                    image: productCard.querySelector('.product-image img').src,
                    brand: productCard.querySelector('.brand')?.textContent || ''
                };
                cart.addItem(product);
                
                // Feedback visivo
                const originalText = this.textContent;
                this.textContent = 'Aggiunto!';
                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            });
        }
    });
});
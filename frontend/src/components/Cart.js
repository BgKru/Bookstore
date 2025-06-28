import cartService from '../services/CartService';

class Cart {
    constructor() {
        this.element = document.createElement('div');
        this.element.className = 'cart';
        this.render();
    }

    async render() {
        const cart = await cartService.getCart();

        this.element.innerHTML = `
            <h2>Your Cart</h2>
            ${cart ? this.renderCartItems(cart) : '<p>Your cart is empty</p>'}
            ${cart ? this.renderTotal(cart) : ''}
            ${cart ? '<button class="checkout-btn">Proceed to Checkout</button>' : ''}
        `;

        this.addEventListeners();
    }

    renderCartItems(cart) {
        return `
            <div class="cart-items">
                ${cart.items.map(item => `
                    <div class="cart-item" data-book-id="${item.book.id}">
                        <img src="${item.book.coverImage}" alt="${item.book.title}">
                        <div class="item-details">
                            <h3>${item.book.title}</h3>
                            <p>$${item.book.price.toFixed(2)} x ${item.quantity}</p>
                            <p>Subtotal: $${item.subtotal.toFixed(2)}</p>
                        </div>
                        <div class="item-actions">
                            <input type="number" min="1" value="${item.quantity}"
                                   class="quantity-input">
                            <button class="remove-btn">Remove</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderTotal(cart) {
        return `
            <div class="cart-total">
                <h3>Total: $${cart.totalPrice.toFixed(2)}</h3>
                <button class="clear-cart-btn">Clear Cart</button>
            </div>
        `;
    }

    addEventListeners() {
        this.element.querySelectorAll('.quantity-input').forEach(input => {
            input.addEventListener('change', async (e) => {
                const bookId = e.target.closest('.cart-item').dataset.bookId;
                await cartService.updateQuantity(bookId, parseInt(e.target.value));
                this.render();
            });
        });

        this.element.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', async (e) => {
                const bookId = e.target.closest('.cart-item').dataset.bookId;
                await cartService.removeFromCart(bookId);
                this.render();
            });
        });

        const clearBtn = this.element.querySelector('.clear-cart-btn');
        if (clearBtn) {
            clearBtn.addEventListener('click', async () => {
                await cartService.clearCart();
                this.render();
            });
        }

        const checkoutBtn = this.element.querySelector('.checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                // Реализация оформления заказа
                alert('Proceeding to checkout');
            });
        }
    }

    getElement() {
        return this.element;
    }
}

export default Cart;
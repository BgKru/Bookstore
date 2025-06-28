class CartService {
    constructor() {
        this.cart = null;
        this.userId = 1; // Временное решение до реализации аутентификации
    }

    async getCart() {
        try {
            const response = await fetch(`/api/cart?userId=${this.userId}`);
            if (!response.ok) throw new Error('Failed to fetch cart');
            this.cart = await response.json();
            return this.cart;
        } catch (error) {
            console.error('CartService.getCart error:', error);
            return null;
        }
    }

    async addToCart(bookId, quantity = 1) {
        try {
            const response = await fetch('/api/cart/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `userId=${this.userId}&bookId=${bookId}&quantity=${quantity}`
            });

            if (!response.ok) throw new Error('Failed to add to cart');
            this.cart = await response.json();
            return this.cart;
        } catch (error) {
            console.error('CartService.addToCart error:', error);
            return null;
        }
    }

    async removeFromCart(bookId) {
        try {
            const response = await fetch('/api/cart/remove', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `userId=${this.userId}&bookId=${bookId}`
            });

            if (!response.ok) throw new Error('Failed to remove from cart');
            this.cart = await response.json();
            return this.cart;
        } catch (error) {
            console.error('CartService.removeFromCart error:', error);
            return null;
        }
    }

    async updateQuantity(bookId, quantity) {
        try {
            const response = await fetch('/api/cart/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `userId=${this.userId}&bookId=${bookId}&quantity=${quantity}`
            });

            if (!response.ok) throw new Error('Failed to update quantity');
            this.cart = await response.json();
            return this.cart;
        } catch (error) {
            console.error('CartService.updateQuantity error:', error);
            return null;
        }
    }

    async clearCart() {
        try {
            const response = await fetch('/api/cart/clear', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `userId=${this.userId}`
            });

            if (!response.ok) throw new Error('Failed to clear cart');
            this.cart = null;
            return true;
        } catch (error) {
            console.error('CartService.clearCart error:', error);
            return false;
        }
    }
}

export default new CartService();
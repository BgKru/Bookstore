// src/cart.js
export const addToCart = (book) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = cart.find(item => item.id === book.id);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...book, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
};

export const getCartItems = () => {
    return JSON.parse(localStorage.getItem('cart') || '[]');
};
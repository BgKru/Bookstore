// src/api.js
const API_URL = '/api';

export const getBooks = async () => {
    const response = await fetch(`${API_URL}/books`);
    return await response.json();
};

export const getBookById = async (id) => {
    const response = await fetch(`${API_URL}/books/${id}`);
    return await response.json();
};

export const getCartItems = async (userId) => {
    const response = await fetch(`${API_URL}/cart/${userId}`);
    return await response.json();
};

export const addToCart = async (userId, bookId, quantity = 1) => {
    const response = await fetch(`${API_URL}/cart/${userId}/add?bookId=${bookId}&quantity=${quantity}`, {
        method: 'POST',
    });
    return await response.json();
};

export const getCategories = async () => {
    const response = await fetch(`${API_URL}/categories`);
    return await response.json();
};

export const removeFromCart = async (userId, bookId) => {
    const response = await fetch(`${API_URL}/cart/${userId}/remove?bookId=${bookId}`, {
        method: 'DELETE',
    });
    return response.ok;
};

export const createOrder = async (userId) => {
    const response = await fetch(`${API_URL}/orders/${userId}`, {
        method: 'POST',
    });
    return await response.json();
};

export const getOrders = async (userId) => {
    const response = await fetch(`${API_URL}/orders/${userId}`);
    return await response.json();
};
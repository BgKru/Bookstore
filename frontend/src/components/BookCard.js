// src/components/BookCard.js

import { addToCart } from '../api';

export default function BookCard({ book }) {
    const handleAddToCart = async () => {
        const userId = 1; // временно, позже заменим на реального пользователя
        await addToCart(userId, book.id);
        alert('Книга добавлена в корзину');
    };

    return (
        <div className="border rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow">
            <img src={book.coverImageUrl || "https://via.placeholder.com/200x300 "} alt={book.title} className="w-full h-64 object-cover" />
            <div className="p-4">
                <h3 className="font-semibold text-lg">{book.title}</h3>
                <p className="text-gray-600">{book.author}</p>
                <p className="mt-2 text-indigo-600 font-bold">{book.price} ₽</p>
                <button
                    onClick={handleAddToCart}
                    className="mt-2 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                >
                    В корзину
                </button>
            </div>
        </div>
    );
}
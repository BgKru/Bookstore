// src/pages/CartPage.js

import { useEffect, useState } from 'react';
import { getCartItems, createOrder } from '../api';

export default function CartPage() {
    const [cart, setCart] = useState([]);
    const userId = 1; // временный ID

    useEffect(() => {
        const loadCart = async () => {
            const data = await getCartItems(userId);
            setCart(data);
        };
        loadCart();
    }, []);

    const total = cart.reduce((sum, item) => sum + item.book?.price * item.quantity, 0);

    const handleCheckout = async () => {
        const result = await createOrder(userId);
        alert('Заказ оформлен!');
        setCart([]); // очищаем корзину
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Корзина</h2>
            {cart.length === 0 ? (
                <p>Корзина пуста</p>
            ) : (
                <div>
                    <ul className="space-y-4">
                        {cart.map((item) => (
                            <li key={item.id} className="flex items-center gap-4 border p-4 rounded">
                                <img src={item.book.coverImageUrl} alt={item.book.title} className="w-16 h-auto" />
                                <div className="flex-grow">
                                    <h3 className="font-semibold">{item.book.title}</h3>
                                    <p>Количество: {item.quantity}</p>
                                </div>
                                <p className="font-bold">{item.book.price * item.quantity} ₽</p>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6 text-right">
                        <p className="text-xl font-bold">Итого: {total.toFixed(2)} ₽</p>
                        <button
                            onClick={handleCheckout}
                            className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                        >
                            Оформить заказ
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
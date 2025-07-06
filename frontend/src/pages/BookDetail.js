// src/pages/BookDetail.js
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getBookById } from '../api';

export default function BookDetail() {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const loadBook = async () => {
            const data = await getBookById(id);
            setBook(data);
        };
        loadBook();
    }, [id]);

    if (!book) return <p>Загрузка...</p>;

    return (
        <div className="max-w-3xl mx-auto">
            <div className="flex gap-6">
                <img
                    src={book.coverImageUrl || "https://via.placeholder.com/300x450 "}
                    alt={book.title}
                    className="w-48 h-auto rounded"
                />
                <div>
                    <h1 className="text-3xl font-bold">{book.title}</h1>
                    <p className="text-lg text-gray-600 mt-2">Автор: {book.author}</p>
                    <p className="mt-4 text-gray-700">{book.description}</p>
                    <p className="mt-4 text-indigo-600 font-bold text-xl">{book.price} ₽</p>
                    <button className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700">
                        В корзину
                    </button>
                </div>
            </div>
        </div>
    );
}
// src/pages/Home.js
import { useEffect, useState } from 'react';
import BookList from '../components/BookList';
import CategoryList from '../components/CategoryList';
import { getBooks } from '../api';

export default function Home() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const loadBooks = async () => {
            const data = await getBooks();
            setBooks(data);
        };
        loadBooks();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <aside className="md:col-span-1">
                <CategoryList />
            </aside>
            <main className="md:col-span-3">
                <h2 className="text-2xl font-bold mb-6">Популярные книги</h2>
                {books.length > 0 ? (
                    <BookList books={books} />
                ) : (
                    <p>Нет доступных книг</p>
                )}
            </main>
        </div>
    );
}
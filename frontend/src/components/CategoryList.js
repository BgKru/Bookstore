// src/components/CategoryList.js
import { useEffect, useState } from 'react';
import { getCategories } from '../api';

export default function CategoryList() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCategories = async () => {
            const data = await getCategories();
            setCategories(data);
            setLoading(false);
        };

        loadCategories();
    }, []);

    if (loading) return <p>Загрузка категорий...</p>;

    return (
        <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Категории</h2>
            <ul className="space-y-2">
                {categories.map(category => (
                    <li key={category.id} className="border-l-4 border-indigo-500 pl-2">
                        {category.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">BookStore</h1>
        <nav>
          <ul className="flex gap-6">
            <li><a href="/" className="text-gray-700 hover:text-indigo-600">Главная</a></li>
            <li><a href="/cart" className="text-gray-700 hover:text-indigo-600">Корзина</a></li>
            <li><a href="/login" className="text-gray-700 hover:text-indigo-600">Вход</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
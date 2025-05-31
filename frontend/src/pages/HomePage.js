import CartService from '../services/CartService';

class HomePage {
    constructor() {
        this.cartService = new CartService();
        this.init();
    }

    async init() {
        await this.loadBooks();
        this.render();
    }

    async loadBooks() {
        try {
            const response = await fetch('/api/books');
            if (!response.ok) throw new Error('Network response was not ok');
            this.books = await response.json();
        } catch (error) {
            console.error('Error loading books:', error);
        }
    }

    render() {
        const app = document.getElementById('app');
        app.innerHTML = `
            <header class="header">
                <h1>BookStore</h1>
                <nav class="nav">
                    <a href="/">Home</a>
                    <a href="/catalog">Catalog</a>
                    <a href="/cart">Cart <span id="cart-counter">0</span></a>
                </nav>
            </header>
        const app = document.getElementById('app');
        app.innerHTML = `
            <header class="header">
                <h1>BookStore</h1>
                <nav class="nav">
                    <a href="/">Home</a>
                    <a href="/catalog">Catalog</a>
                    <a href="/cart">Cart</a>
                </nav>
            </header>
            <main class="main-content">
                <section class="featured-books">
                    <h2>Featured Books</h2>
                    <div class="book-list" id="bookList"></div>
                </section>
            </main>
            <footer class="footer">
                <p>&copy; 2023 BookStore. All rights reserved.</p>
            </footer>
        `;

        this.updateCartCounter();
        this.renderBookList();
    }

     addToCart(bookId) {
            this.cartService.addToCart(bookId)
                .then(() => {
                    alert('Book added to cart');
                    // Можно обновить иконку корзины с количеством
                })
                .catch(error => {
                    console.error('Error adding to cart:', error);
                });
        }

    renderBookList() {
        const bookList = document.getElementById('bookList');
        bookList.innerHTML = this.books.map(book => `
            <div class="book-card">
                <img src="${book.coverImage}" alt="${book.title}">
                <h3>${book.title}</h3>
                <p>by ${book.author}</p>
                <p>$${book.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${book.id}">Add to Cart</button>
            </div>
        `).join('');

        // Добавляем обработчики событий для кнопок
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => this.addToCart(e.target.dataset.id));
        });
    }

    addToCart(bookId) {
        console.log(`Adding book ${bookId} to cart`);
        // Здесь будет логика добавления в корзину
    }

    async updateCartCounter() {
        const cart = await this.cartService.getCart();
        const counter = document.getElementById('cart-counter');
        if (counter && cart) {
            counter.textContent = cart.items.reduce((total, item) => total + item.quantity, 0);
        }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new HomePage();

});
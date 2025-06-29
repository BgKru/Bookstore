-- Создание таблицы пользователей
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы книг
CREATE TABLE IF NOT EXISTS book (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    cover_image VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы корзин
CREATE TABLE IF NOT EXISTS carts (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id),
    total_price DECIMAL(10, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы элементов корзины
CREATE TABLE IF NOT EXISTS cart_items (
    id BIGSERIAL PRIMARY KEY,
    cart_id BIGINT NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
    book_id BIGINT NOT NULL REFERENCES book(id),
    quantity INTEGER NOT NULL DEFAULT 1,
    subtotal DECIMAL(10, 2) GENERATED ALWAYS AS (
        (SELECT price FROM book WHERE id = book_id) * quantity
    ) STORED,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(cart_id, book_id)
);

-- Создание индексов для ускорения запросов
CREATE INDEX IF NOT EXISTS idx_books_title ON book(title);
CREATE INDEX IF NOT EXISTS idx_books_author ON book(author);
CREATE INDEX IF NOT EXISTS idx_carts_user_id ON carts(user_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_cart_id ON cart_items(cart_id);

-- Вставка пользователей
INSERT INTO users (username, email, password) VALUES
('john_doe', 'john@example.com', 'password123'),
('jane_smith', 'jane@example.com', 'securepass');

-- Вставка книг
INSERT INTO book (title, author, description, price, cover_image) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', 'A story about the American Dream', 9.99, 'gatsby.jpg'),
('1984', 'George Orwell', 'Dystopian novel about surveillance society', 12.99, '1984.jpg'),
('To Kill a Mockingbird', 'Harper Lee', 'Classic novel on racial injustice', 8.99, 'mockingbird.jpg');

-- Вставка корзин
INSERT INTO carts (user_id, total_price) VALUES
(1, 0.00),
(2, 0.00);

-- Вставка элементов корзины
INSERT INTO cart_items (cart_id, book_id, quantity) VALUES
(1, 1, 2),
(1, 2, 1),
(2, 3, 3);
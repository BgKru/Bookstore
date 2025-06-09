-- Добавление тестовых пользователей
INSERT INTO users (username, email, password) VALUES
('john_doe', 'john@example.com', '$2a$10$xJw...'),
('jane_smith', 'jane@example.com', '$2a$10$yHw...');

-- Добавление тестовых книг
INSERT INTO books (title, author, description, price, cover_image) VALUES
('Clean Code', 'Robert C. Martin', 'A handbook of agile software craftsmanship', 35.99, '/images/clean_code.jpg'),
('Design Patterns', 'Erich Gamma', 'Elements of reusable object-oriented software', 42.50, '/images/design_patterns.jpg');

-- Создание корзин для пользователей
INSERT INTO carts (user_id) VALUES (1), (2);

-- Добавление книг в корзину первого пользователя
INSERT INTO cart_items (cart_id, book_id, quantity) VALUES
(1, 1, 2),
(1, 2, 1);
-- Вставляем категории
INSERT INTO categories (name) VALUES
('Фантастика'),
('Роман'),
('Научная литература'),
('Приключения');

-- Вставляем книги
INSERT INTO books (title, author, description, price, cover_image_url, category_id) VALUES
('Война и мир', 'Лев Толстой', 'Эпический роман о войне 1812 года', 499.00, 'https://example.com/images/war_and_peace.jpg ', 2),
('Мастер и Маргарита', 'Михаил Булгаков', 'Философский роман с элементами сатиры', 399.00, 'https://example.com/images/master_and_margarita.jpg ', 2),
('Андроиды мечтают о электроовцах?', 'Филип К. Дик', 'Фантастический детектив о будущем', 599.00, 'https://example.com/images/androids_dream.jpg ', 1),
('Программируем на Java', 'Брюс Эккель', 'Классическое пособие по Java', 799.00, 'https://example.com/images/java_book.jpg ', 3);

-- Вставляем пользователя
INSERT INTO users (username, password, email) VALUES
('user1', '$2a$10$eRCdOfpSHzRwZqBkX8uOTEoGxvFjLlP7yYhNvDnOQZbWzJmK7HcTm', 'user1@example.com');
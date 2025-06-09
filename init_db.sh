#!/bin/bash

# Параметры подключения
DB_NAME="bookstore_db"
DB_USER="bookstore_user"
DB_PASSWORD="Awdxzqetgvcfr1!"
DB_HOST="localhost"
DB_PORT="5432"

# Создаем базу данных и пользователя
sudo -u postgres psql <<EOF
CREATE DATABASE $DB_NAME;
CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD';
ALTER ROLE $DB_USER SET client_encoding TO 'utf8';
ALTER ROLE $DB_USER SET default_transaction_isolation TO 'read committed';
ALTER ROLE $DB_USER SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;
\q
EOF

echo "Database and user created successfully!"
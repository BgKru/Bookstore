#!/bin/sh

# Ожидаем доступности PostgreSQL
/app/wait-for-it.sh postgres:5432 --timeout=30 --strict -- echo "PostgreSQL is up"

# Запускаем приложение
exec java -jar /app/app.jar
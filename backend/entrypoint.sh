#!/bin/sh
set -e

# Ждём Postgres
/app/wait-for-it.sh postgres:5432

# Запуск Java-приложения
java -jar /app/app.jar
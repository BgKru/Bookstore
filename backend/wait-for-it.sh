#!/bin/sh
set -e

# wait-for-it.sh — простой скрипт для ожидания доступности хоста и порта

host="$1"
shift
cmd="$@"

# Проверяем, что аргументы переданы
if [ -z "$host" ]; then
  echo "Usage: $0 host:port [command]" >&2
  exit 1
fi

# Разбиваем host и port
hostname="${host%%:*}"
port="${host#*:}"

echo "Ожидание доступности $hostname:$port..."

# Цикл ожидания
while ! nc -z "$hostname" "$port"; do
  echo "Postgres ещё не готов. Жду..."
  sleep 1
done

echo "Postgres стал доступен!"

# Запуск основной команды
exec $cmd
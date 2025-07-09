# Шаг 1: Установка зависимостей и сборка
FROM node:18 AS build
WORKDIR /app

# Копируем package.json и конфиги
COPY frontend/package*.json ./frontend/.babelrc ./
COPY frontend/webpack.config.js ./

# Устанавливаем зависимости
RUN npm install --save-dev \
      tailwindcss \
      postcss \
      autoprefixer \
      style-loader \
      css-loader \
      postcss-loader \
      webpack \
      webpack-cli \
      babel-loader \
      @babel/core \
      @babel/preset-env \
      @babel/preset-react \
      react-router-dom

# Копируем исходный код
COPY frontend/src ./src
COPY frontend/public ./public

RUN npm run build-css

# Собираем проект
#RUN npm run build

# Шаг 2: Запуск через Nginx
#FROM nginx:alpine
#COPY --from=build /app/dist /usr/share/nginx/html

#RUN chown -R nginx:nginx /usr/share/nginx/html && \
#    chmod -R 755 /usr/share/nginx/html

EXPOSE 3000
CMD ["npm", "start"]
#CMD ["nginx", "-g", "daemon off;"]
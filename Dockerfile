# Используем Node для сборки
FROM node:18-alpine

# Рабочая папка внутри контейнера
WORKDIR /app

# Сначала копируем package.json и ставим зависимости
COPY package*.json ./
RUN npm install

# Копируем весь код
COPY . .

# Собираем проект (vite build)
RUN npm run build

# Открываем порт
EXPOSE 5173

# Запускаем встроенный preview-сервер Vite
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
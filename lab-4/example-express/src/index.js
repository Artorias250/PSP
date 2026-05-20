const express = require("express");
const path = require("path");
const stocksRouter = require("./routes/stocks");
const stocksService = require("./services/stocksService");

const app = express();
const PORT = 3000;

// Путь к файлу с данными
const DATA_FILE_PATH = path.join(__dirname, "data/stocks.json");
stocksService.init(DATA_FILE_PATH);

// Middleware
app.use(express.json());

// Логирование запросов
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Раздача статики из папки public (в корне проекта)
app.use(express.static(path.join(__dirname, "..", "public")));

// API роуты
app.use("/stocks", stocksRouter);

// Все остальные запросы отдаем index.html (для SPA)
app.use((req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

// Обработка ошибок
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});

# Отчет по лабораторной работе №4: "Создание бэкенда на Express.js. REST API"

## Содержание

1. [Название работы](#1-название-работы)
2. [Цель работы](#2-цель-работы)
3. [Основное задание (Разработка REST API и архитектура Express)](#3-основное-задание-разработка-rest-api-и-архитектура-express)
4. [Дополнительное задание (Реализация PUT-запроса с валидацией)](#4-дополнительное-задание-реализация-put-запроса)

---

## 1. Название работы

**Тема:** Проектирование и разработка серверной части веб-приложения (бэкенда) на платформе Node.js с использованием фреймворка Express.js. Создание RESTful API.

---

## 2. Цель работы

Изучение архитектуры клиент-серверного взаимодействия, принципов построения REST API, маршрутизации запросов, обработки HTTP-методов и работы с файловой системой в качестве постоянного хранилища данных (JSON).

---

## 3. Основное задание (Разработка REST API и архитектура Express)

В рамках основного задания была настроена точка входа сервера (`index.js`) на порту 3000, подключен встроенный парсер JSON-компута и создана многослойная архитектура (Роуты -> Контроллеры -> Сервисы) для управления сущностями из базы данных `stocks.json`.

### Инициализация Express-сервера (`main.js`)

```javascript
const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Express сервер работает!");
});

app.listen(PORT, () => {
    console.log(`Сервер запущен по адресу http://localhost:${PORT}`);
});
```

### Конфигурация маршрутизации REST API (stocks.js)

```JavaScript
const express = require("express");
const router = express.Router();
const stocksController = require("../controllers/stocksController");

router.get("/", stocksController.getAllStocks);
router.get("/:id", stocksController.getStockById);
router.post("/", stocksController.createStock);
router.patch("/:id", stocksController.updateStock);
router.delete("/:id", stocksController.deleteStock);

module.exports = router;
```

## 4. Дополнительное задание (Реализация PUT-запроса)

По заданию преподавателя в систему был интегрирован обработчик PUT-запроса для выполнения операции полного обновления существующей карточки продукта. В контроллере заложена логика валидации: если при перезаписи объекта поля src, title или text не переданы пользователем, сервер автоматически подставляет строковое значение "Не указано".

### Подключение роута для PUT-запроса (stocks.js)

```JavaScript
router.put("/:id", stocksController.putStock);
Логика обработки PUT-запроса в контроллере (stocksController.js)
JavaScript
const putStock = (req, res) => {
    const id = parseInt(req.params.id);
    const { src, title, text } = req.body;

    if (!src) {
        req.body.src = "Не указано";
    }

    if (!title) {
        req.body.title = "Не указано";
    }
    if (!text) {
        req.body.text = "Не указано";
    }

    const updatedStock = stocksService.update(id, req.body);

    if (!updatedStock) {
        return res.status(404).json({ error: "Карточка не найдена" });
    }

    res.json(updatedStock);
};
```

### Сервисный слой взаимодействия с базой данных (stocksService.js)

```JavaScript
const update = (id, stockData) => {
    const stocks = fileService.readData(dataFilePath);
    const index = stocks.findIndex((s) => s.id === id);

    if (index === -1) return null;

    stocks[index] = { ...stocks[index], ...stockData };
    fileService.writeData(dataFilePath, stocks);

    return stocks[index];
};
```

# Отчет по лабораторной работе №6: "Знакомство с Promise и fetch, сборка клиентской части"

## Содержание

1. [Название работы](#1-название-работы)
2. [Цель работы](#2-цель-работы)
3. [Основное задание](#3-основное-задание)
    - [Часть 1: Асинхронные запросы через Fetch API (`ajax.js`)](#часть-1-асинхронные-запросы-через-fetch-api-ajaxjs)
    - [Часть 2: Интеграция фронтенда и бэкенда на Express.js (`index.js`)](#часть-2-интеграция-фронтенда-и-бэкенда-на-expressjs-indexjs)
4. [Вывод](#4-вывод)

---

## 1. Название работы

**Тема:** Перевод клиент-серверного взаимодействия SPA-приложения на Fetch API (Promises/Async-Await) и организация раздачи статических файлов веб-сервером Express.js.

---

## 2. Цель работы

Изучение концепции промисов (`Promise`) и современного синтаксиса `async/await` для работы с асинхронным кодом в JavaScript. Практическое освоение Fetch API взамен устаревшего объекта XMLHttpRequest. Настройка веб-сервера Express для монолитной раздачи клиентских статических ресурсов во избежание ограничений CORS (Same-Origin Policy).

---

## 3. Выполнение работы

Лабораторная работа выполнена в два этапа: рефакторинг сетевого слоя клиентской части с переходом на `fetch` и конфигурация серверного скрипта для одновременной обработки API-маршрутов и отдачи фронтенда.

### Часть 1: Асинхронные запросы через Fetch API (`ajax.js`)

Сервисный модуль `ajax.js` переписан с использованием архитектуры `async/await`. Методы класса больше не требуют передачи callback-функций, а возвращают `Promise`, содержащий обработанные сервером JSON-данные. Добавлена строгая проверка статуса ответа `response.ok`.

```javascript
class Ajax {
    // GET-запрос для получения данных карточек
    async get(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Ошибка при выполнении GET-запроса:", error);
            throw error;
        }
    }

    // POST-запрос для добавления данных
    async post(url, data) {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Ошибка при выполнении POST-запроса:", error);
            throw error;
        }
    }

    // PATCH-запрос для частичного обновления
    async patch(url, data) {
        try {
            const response = await fetch(url, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Ошибка при выполнении PATCH-запроса:", error);
            throw error;
        }
    }

    // DELETE-запрос для удаления данных карточки
    async delete(url) {
        try {
            const response = await fetch(url, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            return response.status === 204 ? null : await response.json();
        } catch (error) {
            console.error("Ошибка при выполнении DELETE-запроса:", error);
            throw error;
        }
    }
}

export const ajax = new Ajax();
```

### Часть 2: Интеграция фронтенда и бэкенда на Express.js (index.js)

Главный файл сервера index.js был дополнен встроенными возможностями Express по раздаче статики (express.static). Папка с фронтендом (public), содержащая HTML, CSS и JS компоненты, размещена в корне проекта бэкенда. Для корректной работы путей SPA-приложения добавлен fallback-обработчик, возвращающий index.html на любые неразрешенные GET-запросы.

```JavaScript
const express = require("express");
const path = require("path");
const stocksRouter = require("./routes/stocks");
const stocksService = require("./services/stocksService");

const app = express();
const PORT = 3000;

const DATA_FILE_PATH = path.join(__dirname, "data/stocks.json");
stocksService.init(DATA_FILE_PATH);

app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/stocks", stocksRouter);

app.use((req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
```

## 4. Вывод

В ходе выполнения лабораторной работы сетевая подсистема клиентской части была успешно модернизирована. Переход от низкоуровневых колбэков объекта XMLHttpRequest к интерфейсу Fetch API совместно с синтаксисом async/await позволил значительно упростить логику обработки ответов и перехвата исключений (try/catch). Объединение фронтенда и бэкенда в рамках одного Express-сервера и настройка express.static позволили полностью устранить необходимость конфигурирования CORS-заголовков, так как все запросы к API теперь выполняются в границах одного домена и порта (http://localhost:3000).

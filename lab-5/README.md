# Отчет по лабораторной работе №5: "Добавление AJAX запросов к API"

## Содержание

1. [Название работы](#1-название-работы)
2. [Цель работы](#2-цель-работы)
3. [Основное задание](#3-основное-задание)
4. [Вывод](#4-заключение)

---

## 1. Название работы

**Тема:** Организация асинхронного клиент-серверного взаимодействия в SPA-приложениях с использованием технологии AJAX и объекта XMLHttpRequest.

---

## 2. Цель работы

Знакомство с механизмом выполнения асинхронных HTTP-запросов из браузера без перезагрузки веб-страницы (AJAX). Практическое освоение объекта XMLHttpRequest, создание сервисного слоя для работы с сетевыми эндпоинтами и динамический рендеринг компонентов на основе данных, полученных от бэкенд-сервера.

---

## 3. Основное задание

В рамках лабораторной работы в проект был добавлен модуль `ajax.js`, инкапсулирующий логику работы с `XMLHttpRequest`. Также реализован класс `StockUrls` для централизованного управления адресами маршрутов API бэкенда. Компоненты страниц были переписаны таким образом, чтобы вместо локального статического массива `getData()` запрашивал данные по сети.

### Модуль для отправки асинхронных запросов (`ajax.js`)

```javascript
class Ajax {
    get(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.send();

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                this._handleResponse(xhr, callback);
            }
        };
    }

    _handleResponse(xhr, callback) {
        try {
            const data = xhr.responseText ? JSON.parse(xhr.responseText) : null;
            callback(data, xhr.status);
        } catch (e) {
            console.error("Ошибка парсинга JSON:", e);
            callback(null, xhr.status);
        }
    }
}

export const ajax = new Ajax();
```

### Конфигурация путей к API сервера (stockUrls.js)

```JavaScript
class StockUrls {
    constructor() {
        this.baseUrl = "http://localhost:3000";
    }

    getStocks() {
        return `${this.baseUrl}/stocks`;
    }

    getStockById(id) {
        return `${this.baseUrl}/stocks/${id}`;
    }
}

export const stockUrls = new StockUrls();
```

### Асинхронное получение данных на Главной странице

```JavaScript
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById("main-page");
    }

    renderData(items) {
        items.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot);
            productCard.render(item, this.clickCard.bind(this));
        });
    }

    getData() {
        ajax.get(stockUrls.getStocks(), (data) => {
            this.renderData(data);
        });
    }

    render() {
        this.parent.innerHTML = "";
        const html = this.getHTML();
        this.parent.insertAdjacentHTML("beforeend", html);

        const blackBar = new BlackBar(this.parent);
        blackBar.render();

        const logo = new Logo(blackBar.pageRoot);
        logo.render();

        this.getData();
    }
}
```

### Динамическая загрузка данных по ID на странице продукта

```JavaScript
    renderData(item) {
        const product = new ProductComponent(this.pageRoot);
        product.render(item, this.clickCard.bind(this));
    }

    getData() {
        ajax.get(stockUrls.getStockById(this.id), (data) => {
            this.renderData(data);
        });
    }
```

---

## 4. Заключение

В ходе лабораторной работы были успешно освоены принципы асинхронного обмена данными между клиентом и сервером по архитектуре AJAX. Был разработан повторно используемый класс Ajax на базе XMLHttpRequest, обрабатывающий стадии изменения состояния запроса (readyState === 4) и парсинг JSON-ответов. Внедрение сетевого слоя позволило полностью разделить хранение контента (бэкенд) и интерфейс его отображения (фронтенд-компоненты SPA).

# Отчет по лабораторной работе №3: "Простое веб-приложение. Верстка"

## Содержание

1. [Название работы](#1-название-работы)
2. [Цель работы](#2-цель-работы)
3. [Основное задание (SPA-приложение и компонентный подход)](#3-основное-задание-spa-приложение-и-компонентный-подход)
4. [Дополнительное задание (Реализация третьей страницы сайта)](#4-дополнительное-задание-реализация-третьей-страницы-сайта)

---

## 1. Название работы

**Тема:** Проектирование и верстка интерфейсов многостраничных SPA-приложений на JavaScript с использованием компонентного подхода и фреймворка Bootstrap.

---

## 2. Цель работы

Знакомство с инструментами сборки и управления зависимостями (Node.js, npm), архитектурой Single Page Application (SPA), динамической генерацией HTML-разметки через JS-компоненты и интеграцией стилей фреймворка Bootstrap.

---

## 3. Основное задание (SPA-приложение и компонентный подход)

В рамках основного задания была создана точка входа приложения `main.js` и базовая структура SPA. Реализованы модули главной страницы `MainPage`, отображающей интерактивные карточки доступных продуктов, и `ProductPage` для вывода подробного описания и характеристик.

### Точка входа в приложение (main.js)

```javascript
import { MainPage } from "./pages/main/index.js";

const root = document.getElementById("root");

const mainPage = new MainPage(root);
mainPage.render();
```

### Логика рендеринга карточек на Главной странице

```JavaScript
import { BlackBar } from "../../components/black-bar/index.js";
import { Logo } from "../../components/Logo/index.js";
import { ProductCardComponent } from "../../components/product-card/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById("main-page");
    }

    getHTML() {
        return `
            <div id=\"main-page\" class=\"d-flex flex-wrap\" style=\"padding-left:200px;\"><div/>
        `;
    }

    render() {
        this.parent.innerHTML = "";
        const html = this.getHTML();
        this.parent.insertAdjacentHTML("beforeend", html);

        const blackBar = new BlackBar(this.parent);
        blackBar.render();

        const logo = new Logo(blackBar.pageRoot);
        logo.render();

        const data = this.getData();
        data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot);
            productCard.render(item, this.clickCard.bind(this));
        });
    }
}
```

---

## 4. Дополнительное задание (Реализация третьей страницы сайта)

Добавлена третья полноценная страница — InfoPage, которая отвечает за вывод углубленной информации. Переход на неё осуществляется со страницы продукта, а отображение контента задействует специализированный компонент ProductInfoComponent.

### Реализация третьей страницы

```JavaScript
import { BlackBar } from "../../components/black-bar/index.js";
import { ProductInfoComponent } from "../../components/product-info/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";

export class InfoPage {
    constructor(parent, id, title, paragraph, icon) {
        this.parent = parent;
        this.id = id;
        this.title = title;
        this.paragraph = paragraph;
        this.icon = icon;
    }

    get pageRoot() {
        return document.getElementById("info-page");
    }

    getHTML() {
        return `
                <div id="info-page" style="padding-left:250px; padding-bottom: 338px; margin-top:0px;"></div>
            `;
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = "";
        const html = this.getHTML();
        this.parent.insertAdjacentHTML("beforeend", html);

        const blackBar = new BlackBar(this.parent);
        blackBar.render();

        const backButton = new BackButtonComponent(blackBar.pageRoot);
        backButton.render(this.clickBack.bind(this));

        const data = this.getData();
        const productInfo = new ProductInfoComponent(this.pageRoot);
        productInfo.render(data);
    }
}
```

### Информационный компонент третьей страницы

```JavaScript
export class ProductInfoComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
                <div class="card" style="width: 25rem; margin-left:300px; margin-top:200px;">
                <div class="d-flex">
                    <img src="${data.icon}" style="width:60px;" class="card-img-top" alt="drop">
                    <h5 class="card-title" style="margin-top:20px;">${data.title}</h5>
                </div>
                    <div class="card-body">
                        <p class="card-text">${data.paragraph}</p>
                    </div>
                </div>
            `;
    }

    render(data) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML("beforeend", html);
    }
}
```

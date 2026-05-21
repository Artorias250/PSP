import { BlackBar } from "../../components/black-bar/index.js";
import { ProductComponent } from "../../components/product/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { InfoPage } from "../info/index.js";
import { MainPage } from "../main/index.js";
export class ProductPage {
    constructor(
        parent,
        id,
        title,
        text,
        paragraph,
        characteristics,
        src,
        icon,
    ) {
        this.parent = parent;
        this.id = id;
        this.title = title;
        this.text = text;
        this.paragraph = paragraph;
        this.characteristics = characteristics;
        this.src = src;
        this.icon = icon;
    }

    getData() {
        return {
            id: 1,
            icon: `${this.icon}`,
            title: `${this.title}`,
            text: `${this.text}`,
            paragraph: this.paragraph,
            characteristics: `${this.characteristics}`,
            src: `${this.src}`,
        };
    }

    get pageRoot() {
        return document.getElementById("product-page");
    }

    getHTML() {
        return `
                <div id="product-page" style="padding-left:250px; padding-bottom: 338px; margin-top:0px;"></div>
            `;
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    clickCard(e) {
        e.stopPropagation();

        let button = e.target;
        while (button && !button.dataset?.id) {
            button = button.parentElement;
        }

        if (!button || !button.dataset) return;

        const cardId = button.dataset.id;
        const cardTitle = button.dataset.title;
        const cardParagraph = button.dataset.paragraph;
        const cardIcon = button.dataset.icon;
        const infoPage = new InfoPage(
            this.parent,
            cardId,
            cardTitle,
            cardParagraph,
            cardIcon,
        );
        infoPage.render();
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
        const product = new ProductComponent(this.pageRoot);
        product.render(data, this.clickCard.bind(this));
    }
}

import { BlackBar } from "../../components/black-bar/index.js";
import { ProductComponent } from "../../components/product/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { InfoPage } from "../info/index.js";
import { MainPage } from "../main/index.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";
import { ProductCardComponent } from "../../components/product-card/index.js";
export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
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
        const infoPage = new InfoPage(this.parent, cardId);
        infoPage.render();
    }

    renderData(item) {
        const product = new ProductComponent(this.pageRoot);
        product.render(item, this.clickCard.bind(this));
    }

    getData() {
        ajax.get(stockUrls.getStockById(this.id), (data) => {
            this.renderData(data);
        });
    }

    render() {
        this.parent.innerHTML = "";
        const html = this.getHTML();
        this.parent.insertAdjacentHTML("beforeend", html);

        const blackBar = new BlackBar(this.parent);
        blackBar.render();

        const backButton = new BackButtonComponent(blackBar.pageRoot);
        backButton.render(this.clickBack.bind(this));

        this.getData();
    }
}

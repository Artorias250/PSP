import { BlackBar } from "../../components/black-bar/index.js";
import { Logo } from "../../components/Logo/index.js";
import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";
export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById("main-page");
    }

    getHTML() {
        return `
            <div id="main-page" class="d-flex flex-wrap" style="padding-left:200px;"><div/>
        `;
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

    clickCard(e) {
        e.stopPropagation();

        let button = e.target;
        while (button && !button.dataset?.id) {
            button = button.parentElement;
        }

        if (!button || !button.dataset) return;

        const cardId = button.dataset.id;

        const productPage = new ProductPage(this.parent, cardId);
        productPage.render();
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

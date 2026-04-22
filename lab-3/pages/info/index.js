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

    getData() {
        return {
            id: 1,
            title: this.title,
            paragraph: this.paragraph,
            icon: this.icon,
        };
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
        const info = new ProductInfoComponent(this.pageRoot);
        info.render(data);
    }
}

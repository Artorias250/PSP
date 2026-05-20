export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(listener) {
        document.getElementById("back-button");
        document.addEventListener("click", listener);
    }

    getHTML() {
        return `
                <button id="back-button" class="btn btn-primary" type="button"
                style="width: 60px; height: 60px; padding: 14px;
                margin-left: 700px; border-radius: 80px;">
                <img src="../../images/home.png"></button>
            `;
    }

    render(listener) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML("beforeend", html);

        const button = document.getElementById("back-button");
        if (button) {
            button.addEventListener("click", listener);
        }
    }
}

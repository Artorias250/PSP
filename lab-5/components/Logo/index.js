export class Logo {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `<div class="bg-primary fs-5" style="width: 60px; height: 60px;
         padding-top: 15px; padding-left: 5px; color:white;
         margin-left: 700px; border-radius: 80px;">NASA<div>`;
    }

    render() {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML("beforeend", html);
    }
}

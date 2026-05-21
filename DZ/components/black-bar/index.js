export class BlackBar {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById("black-bar");
    }

    getHTML() {
        return `<div id="black-bar" style="width:100%; height:90px; padding: 15px; background-color: black;">`;
    }

    render() {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML("afterbegin", html);
    }
}

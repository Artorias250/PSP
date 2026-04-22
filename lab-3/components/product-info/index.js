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

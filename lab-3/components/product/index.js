export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card mb-3" style="max-width: 1000px; margin-top: 100px; margin-left:20px;">
                <div class="row g-0">
                    <div class="col-md-4">
                    <img src="${data.src}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                        <h3 class="card-title">${data.title}</h3>
                        <p class="card-text fs-3">${data.text}</p>
                        <p class="card-text fs-4">${data.characteristics}</p>
                        <button class="btn btn-lg fs-3" style="border: 0px; margin-top:20px;" id="click-card-${data.id}"
                        data-id="${data.id}" data-title="${data.title}" data-paragraph="${data.paragraph}"
                        data-icon="${data.icon}">Узнать больше
                        <img src="../../images/arrow.png" style="width: 25px; margin-bottom: 5px;"></button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    render(data, listener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML("beforeend", html);

        const button = document.getElementById(`click-card-${data.id}`);
        if (button) {
            button.addEventListener("click", (e) => {
                e.stopPropagation();
                listener(e);
            });
        }
    }
}

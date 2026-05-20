export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card text-light" style=" width: 350px; height:490px; margin:20px;
             margin-top: 120px; margin-bottom: 100px; border-radius:0px; background-image: url(${data.src});
             background-size:cover;">
                <div class="card-body">
                    <button class="btn btn-lg fs-2" style="color:white; margin-top: 415px; border: 0px;" id="click-card-${data.id}"
                    data-id="${data.id}" data-title="${data.title}" data-paragraph="${data.paragraph}"
                    data-text="${data.text}" data-characteristics="${data.characteristics}"
                    data-src="${data.src}" data-icon="${data.icon}"
                    >${data.title}
                     <img src="../../images/arrow.png" style="width: 25px; margin-bottom: 5px;"></button>
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

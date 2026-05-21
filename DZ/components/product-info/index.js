import { ThreeDModel } from "../3d-model/index.js";

export class ProductInfoComponent {
    constructor(parent) {
        this.parent = parent;
        this.modelPath = null;
    }

    setModelPath(modelPath) {
        console.log("Установлен путь к модели:", modelPath);
        this.modelPath = modelPath;
    }

    getHTML(data) {
        return `
            <div class="card" style="width: 25rem; margin-left:300px; margin-top:60px;">
                <div class="d-flex">
                    <img src="${data.icon}" style="width:60px;" class="card-img-top" alt="drop">
                    <h5 class="card-title" style="margin-top:20px;">${data.title}</h5>
                </div>
                <div class="card-body">
                    <div id="3d-model-container" style="width: 100%; height: 300px; margin-bottom: 20px; border-radius: 10px; overflow: hidden; background: #111122; position: relative;"></div>
                    <p class="card-text">${data.paragraph}</p>
                </div>
            </div>
        `;
    }

    render(data) {
        console.log("ProductInfoComponent render вызван");
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML("beforeend", html);

        // Загружаем 3D модель, если указан путь
        if (this.modelPath) {
            const modelContainer =
                document.getElementById("3d-model-container");
            if (modelContainer) {
                console.log("Контейнер для 3D модели найден", modelContainer);
                const threeDModel = new ThreeDModel(
                    modelContainer,
                    this.modelPath,
                );
                threeDModel.render();
            } else {
                console.error("Контейнер #3d-model-container не найден");
            }
        } else {
            console.warn("Путь к модели не указан");
        }
    }
}

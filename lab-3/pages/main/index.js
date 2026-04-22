import { BlackBar } from "../../components/black-bar/index.js";
import { Logo } from "../../components/Logo/index.js";
import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";
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

    getData() {
        return [
            {
                id: 1,
                icon: "../../images/drop.png",
                src: "../../images/water.png",
                title: "Аква-Ресурс",
                text: "Замкнутый цикл водоснабжения и хранения",
                paragraph: `Современная система регенерации, позволяющая извлекать до 98% жидкости из сточных вод,
                 конденсата атмосферы и гидратной воды. Это снижает зависимость от грузовых миссий с Земли в 10 раз.`,
                characteristics: `Характеристики:

                                Эффективность регенерации: До 98% (коэффициент замкнутости цикла)

                                Производительность: 5,2 литра очищенной воды в сутки

                                Технология: Мембранная фильтрация + каталитическое окисление

                                Качество воды: Превышает стандарты питьевой воды ISO 5667

                                Энергопотребление: 180 Вт (энергоэффективный режим)`,
            },
            {
                id: 2,
                icon: "../../images/fan.png",
                src: "../../images/oxygen.png",
                title: "Атмосфера-М",
                text: "Контроль газового состава и стерилизация",
                paragraph: `Многоступенчатый комплекс обеспечения газового состава, близкого к земному.
                 Удаляет углекислый газ, летучие органические соединения и патогенные микроорганизмы,
                 обеспечивая полную рециркуляцию воздуха в гермоотсеках.`,
                characteristics: `Характеристики:

                                Удаление CO₂: До 100% избыточного углекислого газа

                                Регенерация кислорода: 900 литров O₂ в час (за счет электролиза воды)

                                Фильтрация: HEPA-фильтры 99,97% + каталитический дожигатель следов токсинов

                                Уровень шума: 35 дБ (бесшумный режим для жилых модулей)

                                Автономность: 180 дней непрерывной работы без замены картриджей`,
            },
            {
                id: 3,
                icon: "../../images/vegetables.png",
                src: "../../images/storage.png",
                title: "Био-Резерв",
                text: "Длительное хранение и нутрициологический контроль",
                paragraph: `Стратегический запас продуктов питания с возможностью длительной герметичной изоляции (до 5 лет).
                 Модуль включает интеллектуальную систему мониторинга свежести и автоматическую ротацию запасов,
                  а также мини-оранжерею для выращивания микрозелени.`,
                characteristics: `Характеристики:

                                 Объем хранения: 1,2 м³ (обеспечение экипажа из 4 чел. на 200 дней)

                                Ассортимент: Рационы с повышенным содержанием витамина D и антиоксидантов (адаптация к невесомости)

                                Технологии: Вакуумная сублимация, индивидуальная термостабилизация

                                Устойчивость: Сохранность питательных веществ на 95% даже через 3 года хранения`,
            },
        ];
    }

    clickCard(e) {
        e.stopPropagation();

        // Находим кнопку, даже если клик был по вложенному элементу (картинке)
        let button = e.target;
        while (button && !button.dataset?.id) {
            button = button.parentElement;
        }

        if (!button || !button.dataset) return;

        const cardId = button.dataset.id;
        const cardTitle = button.dataset.title;
        const cardText = button.dataset.text;
        const cardParagraph = button.dataset.paragraph;
        const cardCharacteristics = button.dataset.characteristics;
        const cardSrc = button.dataset.src;
        const cardIcon = button.dataset.icon;

        const productPage = new ProductPage(
            this.parent,
            cardId,
            cardTitle,
            cardText,
            cardParagraph,
            cardCharacteristics,
            cardSrc,
            cardIcon,
        );
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

        const data = this.getData();
        data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot);
            productCard.render(item, this.clickCard.bind(this));
        });
    }
}

(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=class{constructor(e){this.parent=e}get pageRoot(){return document.getElementById(`black-bar`)}getHTML(){return`<div id="black-bar" style="width:100%; height:90px; padding: 15px; background-color: black;">`}render(){let e=this.getHTML();this.parent.insertAdjacentHTML(`afterbegin`,e)}},t=class{constructor(e){this.parent=e}getHTML(){return`<div class="bg-primary fs-5" style="width: 60px; height: 60px;
         padding-top: 15px; padding-left: 5px; color:white;
         margin-left: 700px; border-radius: 80px;">NASA<div>`}render(){let e=this.getHTML();this.parent.insertAdjacentHTML(`beforeend`,e)}},n=class{constructor(e){this.parent=e}getHTML(e){return`
            <div class="card text-light" style=" width: 350px; height:490px; margin:20px;
             margin-top: 120px; margin-bottom: 100px; border-radius:0px; background-image: url(${e.src});
             background-size:cover;">
                <div class="card-body">
                    <button class="btn btn-lg fs-2" style="color:white; margin-top: 415px; border: 0px;" id="click-card-${e.id}"
                    data-id="${e.id}" data-title="${e.title}" data-paragraph="${e.paragraph}"
                    data-text="${e.text}" data-characteristics="${e.characteristics}"
                    data-src="${e.src}" data-icon="${e.icon}"
                    >${e.title}
                     <img src="../../images/arrow.png" style="width: 25px; margin-bottom: 5px;"></button>
                </div>
            </div>
        `}render(e,t){let n=this.getHTML(e);this.parent.insertAdjacentHTML(`beforeend`,n);let r=document.getElementById(`click-card-${e.id}`);r&&r.addEventListener(`click`,e=>{e.stopPropagation(),t(e)})}},r=class{constructor(e){this.parent=e}getHTML(e){return`
            <div class="card mb-3" style="max-width: 1000px; margin-top: 100px; margin-left:20px;">
                <div class="row g-0">
                    <div class="col-md-4">
                    <img src="${e.src}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                        <h3 class="card-title">${e.title}</h3>
                        <p class="card-text fs-3">${e.text}</p>
                        <p class="card-text fs-4">${e.characteristics}</p>
                        <button class="btn btn-lg fs-3" style="border: 0px; margin-top:20px;" id="click-card-${e.id}"
                        data-id="${e.id}" data-title="${e.title}" data-paragraph="${e.paragraph}"
                        data-icon="${e.icon}">Узнать больше
                        <img src="../../images/arrow.png" style="width: 25px; margin-bottom: 5px;"></button>
                        </div>
                    </div>
                </div>
            </div>
        `}render(e,t){let n=this.getHTML(e);this.parent.insertAdjacentHTML(`beforeend`,n);let r=document.getElementById(`click-card-${e.id}`);r&&r.addEventListener(`click`,e=>{e.stopPropagation(),t(e)})}},i=class{constructor(e){this.parent=e}addListeners(e){document.getElementById(`back-button`),document.addEventListener(`click`,e)}getHTML(){return`
                <button id="back-button" class="btn btn-primary" type="button"
                style="width: 60px; height: 60px; padding: 14px;
                margin-left: 700px; border-radius: 80px;">
                <img src="../../images/home.png"></button>
            `}render(e){let t=this.getHTML();this.parent.insertAdjacentHTML(`beforeend`,t);let n=document.getElementById(`back-button`);n&&n.addEventListener(`click`,e)}},a=class{constructor(e){this.parent=e}getHTML(e){return`
                <div class="card" style="width: 25rem; margin-left:300px; margin-top:200px;">
                <div class="d-flex">
                    <img src="${e.icon}" style="width:60px; height:100%;" class="card-img-top" alt="drop">
                    <h5 class="card-title" style="margin-top:20px;">${e.title}</h5>
                </div>
                    <div class="card-body">
                        <p class="card-text">${e.paragraph}</p>
                    </div>
                </div>
            `}render(e){let t=this.getHTML(e);this.parent.insertAdjacentHTML(`beforeend`,t)}},o=new class{get(e,t){let n=new XMLHttpRequest;n.open(`GET`,e),n.send(),n.onreadystatechange=()=>{n.readyState===4&&this._handleResponse(n,t)}}post(e,t,n){let r=new XMLHttpRequest;r.open(`POST`,e),r.setRequestHeader(`Conyent-Type`,`application/json`),r.send(JSON.stringify(t)),r.onreadystatechange=()=>{r.readyState===4&&this._handleResponse(r,n)}}patch(e,t,n){let r=new XMLHttpRequest;r.open(`Patch`,e),r.setRequestHeader(`Content-Type`,`application/json`),r.send(JSON.stringify(t)),r.onreadystatechange=()=>{r.readyState===4&&this._handleResponse(r,n)}}delete(e,t){let n=new XMLHttpRequest;n.open(`DELETE`,e),n.send(),n.onreadystatechange=()=>{n.readyState===4&&this._handleResponse(n,t)}}_handleResponse(e,t){try{t(e.responseText?JSON.parse(e.responseText):null,e.status)}catch(n){console.error(`Ошибка парсинга JSON:`,n),t(null,e.status)}}},s=new class{constructor(){this.baseUrl=`http://localhost:3000`}getStocks(){return`${this.baseUrl}/stocks`}getStockById(e){return`${this.baseUrl}/stocks/${e}`}createStock(){return`${this.baseUrl}/stocks`}removeStockById(){return`${this.baseUrl}/stocks/${id}`}updateStockById(){return`${this.baseUrl}/stocks/${id}`}},c=class{constructor(e,t){this.parent=e,this.id=t}get pageRoot(){return document.getElementById(`info-page`)}renderData(e){new a(this.pageRoot).render(e)}getData(){o.get(s.getStockById(this.id),e=>{this.renderData(e)})}getHTML(){return`
                <div id="info-page" style="padding-left:250px; padding-bottom: 338px; margin-top:0px;"></div>
            `}clickBack(){new u(this.parent).render()}render(){this.parent.innerHTML=``;let t=this.getHTML();this.parent.insertAdjacentHTML(`beforeend`,t);let n=new e(this.parent);n.render(),new i(n.pageRoot).render(this.clickBack.bind(this)),this.getData()}},l=class{constructor(e,t){this.parent=e,this.id=t}get pageRoot(){return document.getElementById(`product-page`)}getHTML(){return`
                <div id="product-page" style="padding-left:250px; padding-bottom: 338px; margin-top:0px;"></div>
            `}clickBack(){new u(this.parent).render()}clickCard(e){e.stopPropagation();let t=e.target;for(;t&&!t.dataset?.id;)t=t.parentElement;if(!t||!t.dataset)return;let n=t.dataset.id;new c(this.parent,n).render()}renderData(e){new r(this.pageRoot).render(e,this.clickCard.bind(this))}getData(){o.get(s.getStockById(this.id),e=>{this.renderData(e)})}render(){this.parent.innerHTML=``;let t=this.getHTML();this.parent.insertAdjacentHTML(`beforeend`,t);let n=new e(this.parent);n.render(),new i(n.pageRoot).render(this.clickBack.bind(this)),this.getData()}},u=class{constructor(e){this.parent=e}get pageRoot(){return document.getElementById(`main-page`)}getHTML(){return`
            <div id="main-page" class="d-flex flex-wrap" style="padding-left:200px;"><div/>
        `}renderData(e){e.forEach(e=>{new n(this.pageRoot).render(e,this.clickCard.bind(this))})}getData(){o.get(s.getStocks(),e=>{this.renderData(e)})}clickCard(e){e.stopPropagation();let t=e.target;for(;t&&!t.dataset?.id;)t=t.parentElement;if(!t||!t.dataset)return;let n=t.dataset.id;new l(this.parent,n).render()}render(){this.parent.innerHTML=``;let n=this.getHTML();this.parent.insertAdjacentHTML(`beforeend`,n);let r=new e(this.parent);r.render(),new t(r.pageRoot).render(),this.getData()}};new u(document.getElementById(`root`)).render();
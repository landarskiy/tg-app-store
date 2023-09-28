"use strict";

function pageView(id, content) {
    return `
    <div id="${id}" class="page-container">
        ${content}
    </div>
    `;
}

function appItemView(id, imgUrl, title, description, onClickCallbackName) {
    return `
    <div id="${id}" class="item-app" onclick="${onClickCallbackName}(this)">
        ${smallRoundedSquareImage(imgUrl)}
        <div class="item-app-content" style="margin-left: 12px">
            <div class="text-title-medium">${title}</div>
            <div class="text-body-medium">${description}</div>
        </div>
    </div>
    `;
}

function appDetailsImageView(imgUrl) {
    return `
    <img class="image-app-details" src="${imgUrl}"></img>
    `;
}

function smallRoundedSquareImage(url) {
    return `
    <div class="image image-small image-rounded" style="background-image: url('${url}')"></div>
    `;
}
"use strict";

function pageView(id, content) {
    return `
    <div id="${id}" class="page-container">
        ${content}
    </div>
    `;
}

function appItemView(id, imgUrl, title, category, tags, rating, bookmarked, onClickCallbackName) {
    let categoriesLine = category;
    for (let i = 0; i < tags.length; i++) {
        categoriesLine += " • " + tags[i];
    }
    let bookmarkTag = "";
    if(bookmarked) {
        bookmarkTag = " • Bookmarked";
    }
    return `
    <div id="app-${id}" class="item-app" onclick="${onClickCallbackName}(${id})">
        ${smallRoundedSquareImage(imgUrl)}
        <div class="item-app-content" style="margin-left: 12px">
            <div class="text-title-medium">${title}</div>
            <div class="text-body-medium" style="margin-top: 4px; margin-bottom: 2px">${categoriesLine}</div>
            <div class="text-body-medium">${rating} ★${bookmarkTag}</div>
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

function categoryChipView(id, displayValue, onClickCallbackName) {
    return `
    <button id="category-${id}" class="button-action-secondary" style="margin: 12px 4px" onClick="${onClickCallbackName}('${id}')"">${displayValue.displayText}</button>
    `;
}

function categoryBarView(id, categories, onClickCallbackName) {
    let categoriesLine = "";
    for (let i = 0; i < categories.length; i++) {
        const category = categories[i];
        categoriesLine += `\n
        ${categoryChipView(category.value, category, onClickCallbackName)}
        `;
    }
    return `
    <div id="${id}" class="container-scroll-h">
        ${categoriesLine}
    </div>
    `;
}
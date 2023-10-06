function pageView(id, content) {
    return `
    <div id="${id}" class="${cssPageContainer}">
        ${content}
    </div>
    `;
}

function appItemView(id, imgUrl, title, category, tags, rating, bookmarked, onClickCallbackName) {
    let bookmarkTag = "";
    if(bookmarked) {
        bookmarkTag = " • Bookmarked";
    }
    return `
    <div id="app-${id}" class="${cssItemApp}" onclick="${onClickCallbackName}(${id})">
        ${smallRoundedSquareImageView(imgUrl)}
        <div class="${cssItemAppContent}" style="margin-left: 16px">
            <div class="${cssTextTitleMedium}">${title}</div>
            <div class="${cssTextBodyMedium}" style="margin-top: 4px; margin-bottom: 2px">${buildCategoriesLine(category, tags)}</div>
            <div class="${cssTextBodyMedium}">${rating.toFixed(1)} ★${bookmarkTag}</div>
        </div>
    </div>
    `;
}

function appDetailsItemView(id, imgUrl, title, category, tags) {
    return `
    <div id="app-details-${id}" class="${cssItemApp}">
        ${mediumRoundedSquareImageView(imgUrl)}
        <div class="${cssItemAppContent}" style="margin-left: 12px">
            <div class="${cssTextTitleLarge}">${title}</div>
            <div class="${cssTextBodyLarge}" style="margin-top: 8px; margin-bottom: 2px">${buildCategoriesLine(category, tags)}</div>
        </div>
    </div>
    `;
}

function buildCategoriesLine(category, tags) {
    let categoriesLine = category;
    for (let i = 0; i < tags.length; i++) {
        categoriesLine += " • " + tags[i];
    }
    return categoriesLine;
}

function appDetailsImageView(imgUrl) {
    return `
    <img class="image-app-details" src="${imgUrl}"></img>
    `;
}

function smallRoundedSquareImageView(url) {
    return `
    <div class="${cssImage} ${cssImageSmall} ${cssImageRounded}" style="background-image: url('${url}')"></div>
    `;
}


function mediumRoundedSquareImageView(url) {
    return `
    <div class="${cssImage} ${cssImageMedium} ${cssImageRounded}" style="background-image: url('${url}')"></div>
    `;
}

function screenshotPreviewImageView(url) {
    return `
    <img class="${cssImageAppScreenshotItemImage} ${cssImageRounded20px}" src="${url}"></div>
    `;
}

function categoryChipView(id, displayValue, onClickCallbackName) {
    return `
    <button id="category-${id}" class="${cssButtonAction} ${cssButtonActionSecondary} ${cssButtonRipplePrimary} ${cssItemInScrollHContentSize}" onClick="${onClickCallbackName}('${id}')"">${displayValue.displayText}</button>
    `;
}

function ratingBarView(id, onClickCallbackName) {
    let ratingContent = "";
    for(let i = 1; i<= 5; i++) {
        ratingContent += `
        <div class="${cssContainerItemFlexEqual} ${cssRatingBarItem}" style="padding: 0px 10px">
            <div id="app_rating_${i}" class="" style="width: 100%;" onClick="${onClickCallbackName}('${i}')"">☆</div>
        </div>
        `;
    }
    return `
    <div style="display: flex; padding: 32px 16px 16px 16px; box-sizing: border-box; align-items: center;">
        <div class="${cssItemInScrollHContentSize} ${cssTextTitleMedium}">Rate the app</div>
        <div style="flex: 1; padding: 0px 16px">
            <div id="${id}" class="${cssContainerFlexSpaceBetween}" style="max-width: 60px">
                ${ratingContent}
            </div>
        </div>
    </div>
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
    <div id="${id}" class="${cssContainerScrollH} ${cssContainerScrollHCategories}">
        ${categoriesLine}
    </div>
    `;
}
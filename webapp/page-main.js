"use strict";

let firstDisplay = true;
let appsList = [];
const categoriesList = [
    new DisplayValue("my", "My"),
    new DisplayValue("all", "All"),
    new DisplayValue("finance", "Finance"),
    new DisplayValue("food", "Food"),
    new DisplayValue("games", "Games"),
    new DisplayValue("utilities", "Utilities")
];
let selectedCategoryId = categoriesList[1].value;

function displayMainPage() {
    replaceTopPage("main-page", mainPage());
    loadApps(selectedCategoryId);
    selectCategoryOnUi(selectedCategoryId);
}

function mainPage() {
    return `
    ${categoryBarView("app-categories", categoriesList, "onCategoryClicked")}
    <div id="apps-container"></div>
    `;
}

function onAppClicked(appIndex) {
    if(appIndex < appsList.length) {
        displayAppPage(appsList[appIndex]);
    }
}

function onCategoryClicked(categoryId) {
    if(categoryId == selectedCategoryId) {
        return;
    }
    unselectCategoryOnUi(selectedCategoryId);
    selectedCategoryId = categoryId;
    selectCategoryOnUi(selectedCategoryId);
}

function selectCategoryOnUi(categoryId) {
    removeClassFromElement(`category-${categoryId}`, cssButtonActionSecondary);
    removeClassFromElement(`category-${categoryId}`, cssButtonRippleSecondary);
    addClassToElement(`category-${categoryId}`,cssButtonActionPrimary);
    addClassToElement(`category-${categoryId}`,cssButtonRipplePrimary);
}

function unselectCategoryOnUi(categoryId) {
    addClassToElement(`category-${categoryId}`, cssButtonActionSecondary);
    addClassToElement(`category-${categoryId}`, cssButtonRippleSecondary);
    removeClassFromElement(`category-${categoryId}`, cssButtonActionPrimary);
    removeClassFromElement(`category-${categoryId}`, cssButtonRipplePrimary);
}

function displayApps(apps) {
    let displayContent = "";
    for (let i = 0; i < apps.length; i++) {
        const app = apps[i];
        displayContent += `\n${appItemView(i, app.iconUrl, app.title, app.category, app.tags, app.rating, app.fav, "onAppClicked")}`
    }
    replaceInElement("apps-container", displayContent);
    appsList = apps;

    if(firstDisplay) {
        Telegram.WebApp.expand();
        firstDisplay =  false;
    }
}

function loadApps(category) {
    if(stubData) {
        loadAppsFromStub(category);
    } else {
        loadAppsFromServer(category);
    }
}

function loadAppsFromStub(category) {
    const appsResponse = JSON.parse(mockAppListResponse);
    let appList = appsResponse.apps;
    for(let i = 0; i< 20; i++) {
        appList = appList.concat(appsResponse.apps);
    }
    displayApps(appList);
}

function loadAppsFromServer(category) {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Fetch error:', error);
        });
}
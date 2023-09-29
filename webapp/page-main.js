"use strict";
let appsList = [];
const categoriesList = [
    new DisplayValue("all", "All"),
    new DisplayValue("finance", "Finance"),
    new DisplayValue("food", "Food"),
    new DisplayValue("games", "Games"),
    new DisplayValue("utilities", "Utilities")
];
let selectedCategoryId = categoriesList[0].value;

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
    removeClassFromElement(`category-${categoryId}`, "button-action-secondary");
    addClassToElement(`category-${categoryId}`, "button-action-primary");
}

function unselectCategoryOnUi(categoryId) {
    addClassToElement(`category-${categoryId}`, "button-action-secondary");
    removeClassFromElement(`category-${categoryId}`, "button-action-primary");
}

function displayApps(apps) {
    let displayContent = "";
    for (let i = 0; i < apps.length; i++) {
        const app = apps[i];
        displayContent += `\n${appItemView(i, app.iconUrl, app.title, app.category, app.tags, app.rating, app.fav, "onAppClicked")}`
    }
    replaceInElement("apps-container", displayContent);
    appsList = apps;
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
    displayApps(appsResponse.apps);
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
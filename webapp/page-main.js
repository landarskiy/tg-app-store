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
let selectedCategoryId = categoriesList[1].key;

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
    if (appIndex < appsList.length) {
        displayAppPage(appsList[appIndex]);
    }
}

function onCategoryClicked(categoryId) {
    if (categoryId == selectedCategoryId) {
        return;
    }
    unselectCategoryOnUi(selectedCategoryId);
    selectedCategoryId = categoryId;
    selectCategoryOnUi(selectedCategoryId);
    loadApps(categoryId);
}

function selectCategoryOnUi(categoryId) {
    removeClassFromElement(`category-${categoryId}`, cssButtonActionSecondary);
    removeClassFromElement(`category-${categoryId}`, cssButtonRippleSecondary);
    addClassToElement(`category-${categoryId}`, cssButtonActionPrimary);
    addClassToElement(`category-${categoryId}`, cssButtonRipplePrimary);
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

    if (firstDisplay) {
        Telegram.WebApp.expand();
        firstDisplay = false;
    }
}

function pageMainBookmarkChanged(appDetails, addToBookmarksResponse) {
    if (selectedCategoryId == "all") {
        loadApps(selectedCategoryId);
        return;
    } 
    let appIndex = findAppIndexById(appDetails.id);
    if (appIndex == -1) {
        return;
    }
    let app = appsList[appIndex];
    app.fav = addToBookmarksResponse.fav;
    replaceInElement(`app-${appIndex}`, appItemViewContent(app.iconUrl, app.title, app.category, app.tags, app.rating, app.fav));
}

function findAppIndexById(appId) {
    for (let i = 0; i < appsList.length; i++) {
        if (appsList[i].id == appId) {
            return i;
        }
    }
    return -1;
}

// Network

function loadApps(category) {
    loadAppListDelegate(
        window.Telegram.WebApp.initDataUnsafe?.user?.id,
        category,
        initDataProviderDelegate(),
        data => {
            displayApps(data);
        },
        error => { }
    );
}
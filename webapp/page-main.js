"use strict";
let appsList = [];

function displayMainPage() {
    replaceTopPage("main-page", mainPage());
    loadApps("All");
}

function mainPage() {
    return `
    <h2>Loading page</h2>
    <p>Wait until the data has been loaded.</p>
    <div id="apps-container"></div>
    `;
}

function onAppClicked(element) {
    const appIndex = parseInt(element.id.split("_")[1]);
    if(appIndex < appsList.length) {
        displayAppPage(appsList[appIndex]);
    }
}

function displayApps(apps) {
    let displayContent = "";
    for (let i = 0; i < apps.length; i++) {
        const app = apps[i];
        displayContent += `\n${appItemView("app_" + i, app.iconUrl, app.title, app.category, "onAppClicked")}`
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
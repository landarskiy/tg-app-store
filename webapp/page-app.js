"use strict";

let selectedAppDetails;

function displayAppPage(app) {
    pushPage("app-page", appDetailsPage());
    loadAppDetails(app);
}

function appDetailsPage() {
    return `
    <h2>Loading page</h2>
    <p>Wait until the data has been loaded.</p>
    <div id="image-app-details-container" class="image-app-details-container">        
    </div>
    <button class="button-action-primary" onClick="onOpenAppClicked()">Open app</button>
    <button class="button-action-secondary" onClick="onOpenAppClicked()">Open app</button>
    `;
}

function onOpenAppClicked() {
    if (selectedAppDetails) {
        window.Telegram.WebApp.openTelegramLink(selectedAppDetails.botAppUrl);
    }
}

function displayAppDetails(appDetails) {
    selectedAppDetails = appDetails;
    replaceInElement("image-app-details-container", appDetailsImageView(appDetails.imageUrl));
}

function loadAppDetails(app) {
    if (stubData) {
        loadAppsDetailsFromStub(app);
    }
}

function loadAppsDetailsFromStub(app) {
    const appResponse = JSON.parse(mockAppDetailsResponse);
    displayAppDetails(appResponse[app.id]);
}
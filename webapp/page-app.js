"use strict";

const idAppDetailsBookmark = "app-details-bookmark";
let selectedAppDetails;

function displayAppPage(app) {
    pushPage("app-page", appDetailsPage());
    loadAppDetails(app);
}

function appDetailsPage() {
    return `
    <div id="image-app-details-container" class="image-app-details-container">        
    </div>
    <div class="container-flex-space-between">
        <div class="container-item-flex-equal" style="padding: 20px 10px">
            <button id="${idAppDetailsBookmark}" class="button-action-primary" style="width: 100%;" onClick="onBookmarkClicked()">Bookmark</button>
        </div>
        <div class="container-item-flex-equal" style="padding: 20px 10px">
            <button class="button-action-primary" style="width: 100%" onClick="onOpenAppClicked()">Launch</button>
        </div>
    </div>
    `;
}

function updateBookmarkState() {
    if(!selectedAppDetails) {
        return;
    }
    removeClassesFromElement(idAppDetailsBookmark, ["button-action-primary",  "button-action-secondary"]);
    if(selectedAppDetails.fav) {
        addClassToElement(idAppDetailsBookmark, "button-action-secondary");
        replaceInElement(idAppDetailsBookmark, "Bookmarked")
    } else {
        addClassToElement(idAppDetailsBookmark, "button-action-primary");
        replaceInElement(idAppDetailsBookmark, "Bookmark")
    }
}

function onOpenAppClicked() {
    if (selectedAppDetails) {
        window.Telegram.WebApp.openTelegramLink(selectedAppDetails.botAppUrl);
    }
}

function onBookmarkClicked() {
    if(selectedAppDetails) {
        bookmarkApp(selectedAppDetails);
    }
}

function displayAppDetails(appDetails) {
    selectedAppDetails = appDetails;
    replaceInElement("image-app-details-container", appDetailsImageView(appDetails.imageUrl));
    updateBookmarkState();
}

function updateAppDetails(appDetails) {
    selectedAppDetails = appDetails;
    updateBookmarkState();
}

// Network

function loadAppDetails(app) {
    if (stubData) {
        loadAppsDetailsFromStub(app);
    }
}

function bookmarkApp(appDetails) {
    if(stubData) {
        stubBookmarkApp(appDetails);
    }
}

function loadAppsDetailsFromStub(app) {
    const appResponse = JSON.parse(mockAppDetailsResponse);
    displayAppDetails(appResponse[app.id]);
}

function stubBookmarkApp(appDetails) {
    appDetails.fav = !appDetails.fav;
    updateAppDetails(appDetails);
}
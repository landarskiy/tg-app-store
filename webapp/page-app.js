"use strict";

const idAppDetailsBookmark = "app-details-bookmark";
let selectedAppDetails;

function displayAppPage(app) {
    pushPage("app-page", appDetailsPage(app));
    loadAppDetails(app);
}

function appDetailsPage(app) {
    return `
    ${appDetailsItemView(app.id, app.iconUrl, app.title, app.category, app.tags)}
    ${appDetailsActionsView()}
    ${appScreenshotsView()}
    ${ratingBarView("rating-bar", "onRatingClicked")}
    `;
}

function appDetailsActionsView() {
    return `
    <div class="${cssContainerFlexSpaceBetween}">
        <div class="${cssContainerItemFlexEqual}" style="padding: 20px 10px">
            <button id="${idAppDetailsBookmark}" class="${cssButtonAction} ${cssButtonActionPrimary} ${cssButtonRipplePrimary}" style="width: 100%;" onClick="onBookmarkClicked()">Bookmark</button>
        </div>
        <div class="${cssContainerItemFlexEqual}" style="padding: 20px 10px">
            <button class="${cssButtonAction} ${cssButtonActionPrimary} ${cssButtonRipplePrimary}" style="width: 100%" onClick="onOpenAppClicked()">Launch</button>
        </div>
    </div>
    `;
}

function appScreenshotsView() {
    return `
    <div id="app-details-screenshots" class="${cssContainerScrollHScreenshotListPreview}">
    </div>
    `;
}

function updateBookmarkState() {
    if(!selectedAppDetails) {
        return;
    }
    removeClassesFromElement(idAppDetailsBookmark, [cssButtonActionPrimary,  cssButtonActionSecondary]);
    if(selectedAppDetails.fav) {
        addClassToElement(idAppDetailsBookmark, cssButtonActionSecondary);
        replaceInElement(idAppDetailsBookmark, "Bookmarked")
    } else {
        addClassToElement(idAppDetailsBookmark, cssButtonActionPrimary);
        replaceInElement(idAppDetailsBookmark, "Bookmark")
    }
    window.Telegram.WebApp.HapticFeedback.selectionChanged();
}

function updateRatingState() {
    if(!selectedAppDetails) {
        return;
    }
    for(let i = 1; i<=selectedAppDetails.userRating; i++) {
        replaceInElement(`app_rating_${i}`, "★");
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

function onRatingClicked(value) {
    if(!window.Telegram.WebApp.initDataUnsafe.user.is_premium) {
        window.Telegram.WebApp.showAlert("Unfortunately, only premium Telegram users can rate apps. This makes our store more reliable and protected from rating scoring by bots.")
        window.Telegram.WebApp.HapticFeedback.selectionChanged("warning");
        return;
    }
    if(selectedAppDetails) {
        
    }
}

function displayAppDetails(appDetails) {
    selectedAppDetails = appDetails;
    replaceInElement("image-app-details-container", appDetailsImageView(appDetails.imageUrl));
    updateBookmarkState();
    updateRatingState();
    displayScreenshots(appDetails);
}

function displayScreenshots(appDetails) {
    let screenshots = "";
    for (const screenshotUrl of appDetails.screenshots) {
        screenshots += `\n${screenshotPreviewImageView(screenshotUrl)}`;
    }
    replaceInElement("app-details-screenshots", screenshots);
}

function updateAppDetails(appDetails) {
    selectedAppDetails = appDetails;
    updateBookmarkState();
    updateRatingState();
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
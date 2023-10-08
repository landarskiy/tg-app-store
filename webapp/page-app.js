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
    ${descriptionBlockView()}
    `;
}

function appDetailsActionsView() {
    return `
    <div class="${cssContainerFlexSpaceBetween}"  style="padding: 0px 16px 16px 16px; gap: 16px">
        <div class="${cssContainerItemFlexEqual}">
            <button id="${idAppDetailsBookmark}" class="${cssButtonAction} ${cssButtonActionPrimary} ${cssButtonRipplePrimary}" style="width: 100%;" onClick="onBookmarkClicked()">Bookmark</button>
        </div>
        <div class="${cssContainerItemFlexEqual}">
            <button class="${cssButtonAction} ${cssButtonActionPrimary} ${cssButtonRipplePrimary}" style="width: 100%" onClick="onOpenAppClicked()">Launch</button>
        </div>
    </div>
    `;
}

function appScreenshotsView() {
    return `
    <div id="app-details-screenshots" class="${cssContainerScrollH} ${cssContainerScrollHScreenshotListPreview}">
    </div>
    `;
}

function descriptionBlockView() {
    return `
    <div id="app-details-description" class="${cssTextBodyMedium}" style="box-sizing: border-box; width: 100%; padding: 0px 16px 16px 16px;">
    </div>
    `;
}

function updateBookmarkState() {
    if (!selectedAppDetails) {
        return;
    }
    removeClassesFromElement(idAppDetailsBookmark, [cssButtonActionPrimary, cssButtonActionSecondary]);
    if (selectedAppDetails.fav) {
        addClassToElement(idAppDetailsBookmark, cssButtonActionSecondary);
        replaceInElement(idAppDetailsBookmark, "Bookmarked")
    } else {
        addClassToElement(idAppDetailsBookmark, cssButtonActionPrimary);
        replaceInElement(idAppDetailsBookmark, "Bookmark")
    }
    window.Telegram.WebApp.HapticFeedback.selectionChanged();
}

function updateRatingState() {
    if (!selectedAppDetails) {
        return;
    }
    for (let i = 1; i <= selectedAppDetails.userRating; i++) {
        replaceInElement(`app_rating_${i}`, "★");
    }
    for (let i = selectedAppDetails.userRating + 1; i <= 5; i++) {
        replaceInElement(`app_rating_${i}`, "☆");
    }
}

function onOpenAppClicked() {
    if (selectedAppDetails) {
        window.Telegram.WebApp.openTelegramLink(selectedAppDetails.botAppUrl);
    }
}

function onBookmarkClicked() {
    if (selectedAppDetails) {
        bookmarkApp(selectedAppDetails);
    }
}

function onRatingClicked(value) {
    if (selectedAppDetails) {
        rateApp(selectedAppDetails, value);
    }
}

function displayAppDetails(appDetails) {
    selectedAppDetails = appDetails;
    replaceInElement("image-app-details-container", appDetailsImageView(appDetails.imageUrl));
    updateBookmarkState();
    updateRatingState();
    displayScreenshots(appDetails);
    replaceInElement("app-details-description", appDetails.description);
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
    loadAppDetailsDelegate(
        window.Telegram.WebApp.initDataUnsafe?.user?.id,
        app.id,
        window.Telegram.WebApp.initData,
        data => {
            displayAppDetails(data);
        },
        error => { }
    );
}

function bookmarkApp(appDetails) {
    bookmarkAppDelegate(
        window.Telegram.WebApp.initDataUnsafe?.user?.id,
        appDetails.id,
        !appDetails.fav,
        window.Telegram.WebApp.initData,
        data => {
            appDetails.fav = data.fav;
            updateBookmarkState();
        },
        error => { }
    );
}

function rateApp(appDetails, rating) {
    rateAppDelegate(
        window.Telegram.WebApp.initDataUnsafe?.user?.id,
        appDetails.id,
        rating,
        window.Telegram.WebApp.initData,
        data => {
            appDetails.rating = data.rating;
            appDetails.rateCount = data.rateCount;
            appDetails.userRating = data.userRating;
            updateRatingState();
        },
        error => { }
    )
}
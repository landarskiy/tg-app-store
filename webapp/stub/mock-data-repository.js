let stubUserFavorites = {};
let stubUserRatings = {};
let stubApps = [];
let stubAppDetails = {};

function loadMockData() {
    for (app of JSON.parse(jsonMockAppList)) {
        app.fav = false;
        stubApps.push(app);
    }
    for (appDetails of JSON.parse(jsonMockAppDetails)) {
        appDetails.fav = false;
        appDetails.userRating = -1;
        stubAppDetails[appDetails.id] = appDetails;
    }
}

loadAppListDelegate = function loadAppList(userId, categoryId, initData, successCallback, failCallback) {
    let returnList = [];
    for (app of stubApps) {
        let userApp = { ...app };
        userApp.fav = stubUserFavorites[app.id];
        returnList.push(userApp);
    }
    successCallback(returnList);
}

loadAppDetailsDelegate = function loadAppDetails(userId, appId, initData, successCallback, failCallback) {
    let appDetails = stubAppDetails[appId];
    appDetails.fav = stubUserFavorites[appId];
    appDetails.userRating = stubUserRatings[appId];
    if(!appDetails.userRating) {
        appDetails.userRating = -1;
    }
    successCallback(appDetails);
}

bookmarkAppDelegate = function bookmarkApp(userId, appId, bookmarked, initData, successCallback, failCallback) {
    if(bookmarked) {
        stubUserFavorites[appId] = true;
    } else {
        stubUserFavorites[appId] = null;
    }
}

rateAppDelegate = function rateApp(userId, appId, rating, initData, successCallback, failCallback) {
    stubUserRatings[appId] = rating;
}

const jsonMockAppList = `
[
    {
        "id": "durgerkingbot",
        "iconUrl": "https://raw.githubusercontent.com/protoshadowmaker/tgminiapp/main/assets/icon-durger.jpeg",
        "title": "Durger King",
        "rating": "4.2",
        "category": "Food",
        "tags": ["Fast food"]
    },
    {
        "id": "wallet",
        "iconUrl": "https://raw.githubusercontent.com/protoshadowmaker/tgminiapp/main/assets/icon-wallet.jpeg",
        "title": "Wallet",
        "rating": "4.9",
        "category": "Finance",
        "tags": [ "Wallet" ]
    }
]
`;

const jsonMockAppDetails = `
[
    {
        "id": "durgerkingbot",
        "iconUrl": "https://raw.githubusercontent.com/protoshadowmaker/tgminiapp/main/assets/icon-durger.jpeg",
        "imageUrl": "https://raw.githubusercontent.com/protoshadowmaker/tgminiapp/main/assets/app-durger.jpg",
        "screenshots": [
            "https://raw.githubusercontent.com/protoshadowmaker/tgminiapp/main/assets/app-durger.jpg",
            "https://raw.githubusercontent.com/protoshadowmaker/tgminiapp/main/assets/app-durger.jpg",
            "https://raw.githubusercontent.com/protoshadowmaker/tgminiapp/main/assets/app-durger.jpg",
            "https://raw.githubusercontent.com/protoshadowmaker/tgminiapp/main/assets/app-durger.jpg"
        ],
        "botAppUrl": "https://t.me/durgerkingbot/menu",
        "title": "Durger King",
        "description": "Use this bot to order fictional fast food – the only fast food that is good for your health!",
        "rating": "4.2",
        "rateCount": 6,
        "category": "Food",
        "tags": ["Fast food"]
    },
    {
        "id": "wallet",
        "iconUrl": "https://raw.githubusercontent.com/protoshadowmaker/tgminiapp/main/assets/icon-wallet.jpeg",
        "imageUrl": "https://raw.githubusercontent.com/protoshadowmaker/tgminiapp/main/assets/app-wallet.jpg",
        "screenshots": [
            "https://raw.githubusercontent.com/protoshadowmaker/tgminiapp/main/assets/app-wallet.jpg",
            "https://raw.githubusercontent.com/protoshadowmaker/tgminiapp/main/assets/app-wallet.jpg",
            "https://raw.githubusercontent.com/protoshadowmaker/tgminiapp/main/assets/app-wallet.jpg"
        ],
        "botAppUrl": "https://t.me/wallet/start",
        "title": "Wallet",
        "description": "Purchase cryptocurrency by bank card, exchange, and transfer to other wallets.",
        "rating": "4.9",
        "rateCount": 12,
        "category": "Finance",
        "tags": [ "Wallet" ]
    }    
]
`;

loadMockData();
let loadAppListDelegate = function loadAppList(userId, categoryId, initData, successCallback, failCallback) {
    const query = new URLSearchParams({ user_id: userId, category_id: categoryId });
    fetch(`${configuration.serverUrl}/app/list?${query.toString()}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ init_data: initData })
    }).then(response => {
        if (!response.ok) {
            throw new Error('Error occured');
        }
        return response.json();
    }).then(data => {
        successCallback(data);
    }).catch(error => {
        failCallback(error);
    });
}

let loadAppDetailsDelegate = function loadAppDetails(userId, appId, initData, successCallback, failCallback) {
    const query = new URLSearchParams({ user_id: userId });
    fetch(`${configuration.serverUrl}/app/details/${appId}?${query.toString()}`).then(response => {
        if (!response.ok) {
            throw new Error('Error occured');
        }
        return response.json();
    }).then(data => {
        successCallback(data);
    }).catch(error => {
        failCallback(error);
    });
}

let bookmarkAppDelegate = function bookmarkApp(userId, appId, bookmarked, initData, successCallback, failCallback) {
    const query = new URLSearchParams({ user_id: userId, app_id: appId, bookmarked: bookmarked });
    fetch(`${configuration.serverUrl}/user/${userId}/bookmarks/update?${query.toString()}`).then(response => {
        if (!response.ok) {
            throw new Error('Error occured');
        }
        return response.json();
    }).then(data => {
        successCallback(data);
    }).catch(error => {
        failCallback(error);
    });
}

let rateAppDelegate = function rateApp(userId, appId, rating, initData, successCallback, failCallback) {
    const query = new URLSearchParams({ user_id: userId, app_id: appId, rating: rating });
    fetch(`${configuration.serverUrl}/app/rating/${appId}/update?${query.toString()}`).then(response => {
        if (!response.ok) {
            throw new Error('Error occured');
        }
        return response.json();
    }).then(data => {
        successCallback(data);
    }).catch(error => {
        failCallback(error);
    });
}

class AppsResponse {
    constructor(apps) {
        this.apps = apps;
    }
}

class AppInfo {
    constructor(id, iconUrl, title, rating, category, tags, fav) {
        this.id = id;
        this.iconUrl = iconUrl;
        this.title = title;
        this.rating = rating;
        this.category = category;
        this.tags = tags;
        this.fav = fav;
    }
}

class AppDetailsInfo {
    constructor(id, iconUrl, imageUrl, screenshots, botAppUrl, title, description, rating, rateCount, userRating, category, tags, fav) {
        this.id = id;
        this.iconUrl = iconUrl;
        this.imageUrl = imageUrl;
        this.screenshots = screenshots;
        this.botAppUrl = botAppUrl;
        this.title = title;
        this.description = description;
        this.rating = rating;
        this.rateCount = rateCount;
        this.userRating = userRating;
        this.category = category;
        this.tags = tags;
        this.fav = fav;
    }
}

class DisplayValue {
    constructor(value, displayText) {
        this.value = value;
        this.displayText = displayText;
    }
}
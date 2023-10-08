function buildInitDataPostParams(initData) {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ init_data: initData })
    };
}

let loadAppListDelegate = function loadAppList(userId, categoryId, initData, successCallback, failCallback) {
    const params = { category_id: categoryId };
    if (userId) {
        params.user_id = userId;
    }
    const query = new URLSearchParams(params);
    fetch(`${configuration.serverUrl}/app/list?${query.toString()}`, buildInitDataPostParams(initData)).then(response => {
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
    fetch(`${configuration.serverUrl}/app/details/${appId}?${query.toString()}`, buildInitDataPostParams(initData)).then(response => {
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
    const query = new URLSearchParams({ app_id: appId, bookmarked: bookmarked });
    fetch(`${configuration.serverUrl}/user/${userId}/bookmarks/update?${query.toString()}`, buildInitDataPostParams(initData)).then(response => {
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
    const query = new URLSearchParams({ user_id: userId, rating: rating });
    fetch(`${configuration.serverUrl}/app/rating/${appId}/update?${query.toString()}`, buildInitDataPostParams(initData)).then(response => {
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

class AddToBookmarksResponse {
    constructor(id, fav) {
        this.id = id;
        this.fav = fav;
    }
}

class RateAppResponse {
    constructor(id, rating, userRating, rateCount) {
        this.id = id;
        this.rating = rating;
        this.userRating = userRating;
        this.rateCount = rateCount;
    }
}

class AppInfo {
    constructor(id, iconUrl, title, rating, rateCount, category, tags, fav) {
        this.id = id;
        this.iconUrl = iconUrl;
        this.title = title;
        this.rating = rating;
        this.rateCount = rateCount;
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
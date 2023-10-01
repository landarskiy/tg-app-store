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
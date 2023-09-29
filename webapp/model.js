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
    constructor(id, iconUrl, imageUrl, botAppUrl, title, description, rating, rateCount, myRating, category, tags, fav) {
        this.id = id;
        this.iconUrl = iconUrl;
        this.imageUrl = imageUrl;
        this.botAppUrl = botAppUrl;
        this.title = title;
        this.description = description;
        this.rating = rating;
        this.rateCount = rateCount;
        this.myRating = myRating;
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
stubData = true;

const mockAppListResponse = `
    {
        "apps": [
            {
                "id": "durgerkingbot",
                "iconUrl": "https://raw.githubusercontent.com/protoshadowmaker/tgminiapp/main/assets/icon-durger.jpeg",
                "title": "Durger King",
                "rating": "4.2",
                "category": "Food",
                "tags": [],
                "fav": false
            },
            {
                "id": "wallet",
                "iconUrl": "https://raw.githubusercontent.com/protoshadowmaker/tgminiapp/main/assets/icon-wallet.jpeg",
                "title": "Wallet",
                "rating": "4.9",
                "category": "Finance",
                "tags": [ "Wallet" ],
                "fav": false
            }
        ]
    }
`;

const mockAppDetailsResponse = `
    {
        "id": "durgerkingbot",
        "iconUrl": "https://raw.githubusercontent.com/protoshadowmaker/tgminiapp/main/assets/icon-durger.jpeg",
        "imageUrl": "https://raw.githubusercontent.com/protoshadowmaker/tgminiapp/main/assets/app-durger.jpg",
        "botAppUrl": "https://t.me/durgerkingbot/menu",
        "title": "Durger King",
        "description": "Use this bot to order fictional fast food – the only fast food that is good for your health!",
        "rating": "4.2",
        "rateCount": 6,
        "myRating": -1,
        "category": "Food",
        "tags": [],
        "fav": false
    }
`;
function displayGamePage() {
    replaceInElement("content", gameBoard());
}

function addNextCard() {
    let cards = document.getElementsByClassName('card');
    appendToElement("game-cards", cardView(cards.length + 1));
    updateCardsMargin();
}

function updateCardsMargin() {
    let availableWidthForCards = document.getElementById("game-cards").offsetWidth;
    let cards = document.getElementsByClassName("card");
    let allCardsSize = cards.length * 250;
    let cardsMargin = 0;
    if(cards.length > 1) {
        let margin = (availableWidthForCards - allCardsSize) / cards.length;
        cardsMargin = Math.min(50, margin);
    }
    for (let i = 1; i < cards.length; i++) {
        cards[i].style.marginLeft = `${cardsMargin}px`;
    }
}
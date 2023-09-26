"use strict";

let cardWidth = 250;
let cardHeight = 350;

function cardView(number) {
    return `
    <div class="card">
        <div class="card-content">
            <h2>Card ${number}</h2>
            <p>This is the content of Card ${number}.</p>
        </div>
    </div>
    `;
}

function gameBoard() {
    return `
    <div id="game-board" class="game-board">
        <div id="game-header" class="game-header"></div>
        <div id="game-cards" class="game-cards"></div>
        <div id="game-actions" class="game-actions">
            <button class="get-card-button" onClick="addNextCard()">Get Card</button>
        </div>
    </div>
    `;
}
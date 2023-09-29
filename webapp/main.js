"use strict";

var viewStackIds = []

window.onload = function() {
    displayMainPage();
};

window.Telegram.WebApp.BackButton.onClick(() => {
    popPage();
});

function pushPage(pageId, content) {
    appendToElement("frame-root", pageView(pageId, content));
    viewStackIds.push(pageId);
    updateBackButtonVisibility();
}

function popPage() {
    if(viewStackIds.length <= 1) {
        return;
    }
    const topPageId = viewStackIds.pop();
    const pageToRemove = document.getElementById(topPageId);
    if (pageToRemove) {
        pageToRemove.remove();
    } 
    updateBackButtonVisibility();
}

function replaceTopPage(pageId, content) {
    popPage();
    pushPage(pageId, content);
    updateBackButtonVisibility();
}

function updateBackButtonVisibility() {
    window.Telegram.WebApp.BackButton.isVisible = viewStackIds.length > 1;
}
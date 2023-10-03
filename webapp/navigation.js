var viewStackIds = [];

window.Telegram.WebApp.BackButton.onClick(() => {
    popPage();
});

function pushPage(pageId, content) {
    appendToElement("frame-root", pageView(pageId, content));
    viewStackIds.push(pageId);
    onViewStackChanged();
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
    onViewStackChanged();
}

function replaceTopPage(pageId, content) {
    popPage();
    pushPage(pageId, content);
    onViewStackChanged();
}

function onViewStackChanged() {
    window.Telegram.WebApp.BackButton.isVisible = viewStackIds.length > 1;
}
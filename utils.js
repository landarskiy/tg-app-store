function appendToElement(elementId, data) {
    getElementById(elementId, (element) => {
        element.innerHTML += data;
    });
}

function replaceInElement(elementId, data) {
    getElementById(elementId, (element) => {
        element.innerHTML = data;
    });
}

function addClassToElement(elementId, className) {
    getElementById(elementId, (element) => {
        element.classList.add(className);
    });
}

function removeClassFromElement(elementId, className) {
    getElementById(elementId, (element) => {
        element.classList.remove(className);
    });
}

function removeClassesFromElement(elementId, classNameList) {
    getElementById(elementId, (element) => {
        for (const className of classNameList) {
            element.classList.remove(className);
        }
    });
}

function getElementById(elementId, callback) {
    const element = document.getElementById(elementId);
    if (element) {
        callback(element);
    }
}

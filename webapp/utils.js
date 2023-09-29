"use strict";

function appendToElement(elementId, data) {
    const element = document.getElementById(elementId);
    if(element) {
        element.innerHTML += data;
    }
}

function replaceInElement(elementId, data) {
    const element = document.getElementById(elementId);
    if(element) {
        element.innerHTML = data;
    }
}

function addClassToElement(elementId, className) {
    const element = document.getElementById(elementId);
    if(element) {
        element.classList.add(className);
    }
}

function removeClassFromElement(elementId, className) {
    const element = document.getElementById(elementId);
    if(element) {
        element.classList.remove(className);
    }
}

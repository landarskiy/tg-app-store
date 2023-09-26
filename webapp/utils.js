"use strict";

function appendToElement(elementId, data) {
    document.getElementById(elementId).innerHTML += data;
}

function replaceInElement(elementId, data) {
    document.getElementById(elementId).innerHTML = data;
}

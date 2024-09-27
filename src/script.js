"use strict";
const displayArea = document.getElementById('display-area');
const inputBox = document.getElementById('input-box');
const button = document.getElementById('action-button');
button.addEventListener('click', () => {
    console.log('Button clicked! adding log in text area');
    alert('Button clicked!');
    displayArea.value += "Button was clicked\n";
});
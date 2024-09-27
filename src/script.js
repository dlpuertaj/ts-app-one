"use strict";
const displayArea = document.getElementById('display-area');
const buttonContainer = document.getElementById('button-container');
const button = document.getElementById('add-button');


let buttonCount = 0;

function addNewButton(){

    console.log(`Adding a new button`);
    buttonCount++;

    const newButton = document.createElement('button');

    newButton.textContent = `Button ${buttonCount}`;
    newButton.id = `button-${buttonCount}`;

    console.log(`New button id: ${newButton.id}`)
    newButton.addEventListener('click', () => genericButtonEventListener(newButton.id) );

    buttonContainer.appendChild(newButton);
    
}

function genericButtonEventListener(customString){
    console.log(`Button ${customString} clicked! adding log in text area`);
    displayArea.value += `Button ${customString} was clicked\n`;
}

button.addEventListener('click', addNewButton);
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

window.addEventListener('DOMContentLoaded', async () => {
    try{
        console.info(`Fetching records using ElectronAPI...`);
        const records = await window.electronAPI.getRecords();
        console.info(`${records.length} records found`);
        displayRecords(records);
    }catch(error){
        console.error('Error while calling electronAPI to fetch records'. error);
    }
});

function displayRecords(records){
    if(records.lenghth === 0){
        displayArea.value = 'No records found.\n';
    } else {
        records.forEach(record => {
           displayArea.value += `${record.dateTime} : ${record.text}\n`; 
        });
    }
}
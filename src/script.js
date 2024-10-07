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

    const newRecord = createRecordData(customString);
    console.log('Storing new record in the database');
    
    console.log(`Button ${customString} clicked! adding record in text area`);
    displayArea.value += `${newRecord[0]} - ${newRecord[1]}`;


    window.electronAPI.addRecord(newRecord[0],newRecord[1]);
}

function createRecordData(customString){
    const date = new Date();
    const dateTimeString = `${String(date.getDate()).padStart(2,'0')}/` +  // Use getDate() instead of getDay()
                       `${String(date.getMonth() + 1).padStart(2,'0')}/` +  // Months are 0-based, so add 1
                       `${date.getFullYear()} - ` + 
                       `${String(date.getHours()).padStart(2, '0')}:` + 
                       `${String(date.getMinutes()).padStart(2, '0')}:` + 
                       `${String(date.getSeconds()).padStart(2, '0')}`;
    console.log(`Storing ${dateTimeString} and ${customString}`);
    let recordData = [];
    recordData.push(dateTimeString);
    recordData.push(`Button ${customString} \n`);
        
    return recordData;
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
           displayArea.value += `${record.dateTime} : ${record.text}`; 
        });
    }
}
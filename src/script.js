"use strict";


const displayArea = document.getElementById('display-area');
const buttonContainer = document.getElementById('button-container');
const button = document.getElementById('add-button');
const table = document.getElementById('records-table');


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

    const date = new Date();
    console.log(`Button ${customString} clicked! will show and save ${date} and ${customString}`);
    const row = document.createElement("tr");

    row.innerHTML = `
    <td>${date}</td>
    <td>${customString}</td>`;

    row.addEventListener("click", () => {
        console.log(`Record: ${date} - ${customString}`);
    });
    table.appendChild(row);

    window.electronAPI.addRecord(date,customString);
}

button.addEventListener('click', addNewButton);

window.addEventListener('DOMContentLoaded', async () => {
    try{
        console.info(`Fetching records using ElectronAPI...`);
        const records = await window.electronAPI.getRecords();
        console.info(`${records.length} records found`);
        displayRecordsInTable(records);
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
function displayRecordsInTable(records){
    if(records.lenghth === 0){
        displayArea.value = 'No records found.\n';
    } else {
        console.log("Displaying in table...");
        records.forEach(record => {
            const row = document.createElement("tr");

            row.innerHTML = `
            <td>${record.dateTime}</td>
            <td>${record.text}</td>`;

            row.addEventListener("click", () => {
                console.log(`Record: ${record.dateTime} - ${record.text}`);
            });
            table.appendChild(row);
        });
    }
}


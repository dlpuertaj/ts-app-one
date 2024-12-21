"use strict";


const displayArea = document.getElementById('display-area');
const buttonContainer = document.getElementById('button-container');
const button = document.getElementById('add-button');
const table = document.getElementById('records-table');


let buttonCount = 0;

function addNewButton() {

    //Create a new button
    console.log(`Adding a new button`);
    buttonCount++;

    const newButton = document.createElement('button');

    newButton.textContent = `Button ${buttonCount}`;
    newButton.id = `button-${buttonCount}`;

    console.log(`New button id: ${newButton.id}`)
    newButton.addEventListener('click', () => genericButtonEventListener(newButton.id+" Text"));

    buttonContainer.appendChild(newButton);

    //Save the button in teh database
    saveButton(newButton.id, newButton.id + "Text");

}

async function saveButton(name, text) {
    const savedButton = await window.electronAPI.saveButton(name, text);
    console.log(`Saved button ${savedButton.name} with text ${savedButton.text}`);
}

async function genericButtonEventListener(customString) {

    const date = new Date();
    const record = await window.electronAPI.addRecord(date, customString);
    console.log(`Button ${customString} clicked! will show and save ${date} , ${customString} and ${record.id}`);


    const row = document.createElement("tr");
    row.innerHTML = `
    <td style="display:none;">${record.id}</>
    <td>${record.dateTime}</td>
    <td>${record.text}</td>`;

    row.className = 'open-popup';

    row.addEventListener("click", () => {
        window.electronAPI.openPopup(record.id, record.dateTime, record.text);
    });

    table.appendChild(row);

}

button.addEventListener('click', addNewButton);

window.addEventListener('DOMContentLoaded', async () => {
    try {
        console.info(`Fetching records using ElectronAPI...`);
        const records = await window.electronAPI.getRecords();
        console.info(`${records.length} records found`);
        displayRecordsInTable(records);

        const buttons = await window.electronAPI.getButtons();
        console.info(`${buttons.length} buttons found`);
        buttons.forEach(button => {
            console.log(`Button: ${button.name} with text ${button.text}`);
            const newButton = document.createElement('button');
            newButton.textContent= button.name
            newButton.id = `button-${button.id}`;
            newButton.addEventListener('click', () => genericButtonEventListener(newButton.id + " Text"));
            buttonContainer.appendChild(newButton);
        });
    } catch (error) {
        console.error('Error while calling electronAPI to fetch records',error);
    }
});

function displayRecordsInTable(records) {
    console.log("Displaying records in table...");
    records.forEach(record => {
        console.log(`Record: ${record.id}`);
        const row = document.createElement("tr");

        row.className = 'open-popup';

        row.innerHTML = `
            <td style="display:none;">${record.id}</>
            <td>${record.dateTime}</td>
            <td>${record.text}</td>`;

        row.addEventListener("click", () => {
            window.electronAPI.openPopup(record.id,record.dateTime,record.text);
        });
        table.appendChild(row);
    });
}

window.electronAPI.onRemoveTableRows(() =>{
    const table = document.getElementById('records-table');
    while (table.rows.length > 0) {
        table.deleteRow(0);
    }
    console.log('Table rows removed');
    console.log('Fetching records again...');
    window.electronAPI.getRecords().then(records => displayRecordsInTable(records));
});


"use strict";


const displayArea = document.getElementById('display-area');
const buttonContainer = document.getElementById('button-container');
const button = document.getElementById('add-button');
const table = document.getElementById('records-table');


let buttonCount = 0;

function addNewButton() {

    console.log(`Adding a new button`);
    buttonCount++;

    const newButton = document.createElement('button');

    newButton.textContent = `Button ${buttonCount}`;
    newButton.id = `button-${buttonCount}`;

    console.log(`New button id: ${newButton.id}`)
    newButton.addEventListener('click', () => genericButtonEventListener(newButton.id));

    buttonContainer.appendChild(newButton);

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
    } catch (error) {
        console.error('Error while calling electronAPI to fetch records'.error);
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


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

function genericButtonEventListener(customString) {

    const date = new Date();
    console.log(`Button ${customString} clicked! will show and save ${date} and ${customString}`);
    const row = document.createElement("tr");

    row.innerHTML = `
    <td>${date}</td>
    <td>${customString}</td>`;

    row.id = customString;
    row.className = 'open-popup';

    row.addEventListener("click", () => {
        window.electronAPI.openPopup(date,customString);
    });
    table.appendChild(row);

    window.electronAPI.addRecord(date, customString);
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
        const row = document.createElement("tr");

        row.className = 'open-popup';

        row.innerHTML = `
            <td>${record.dateTime}</td>
            <td>${record.text}</td>`;

        row.addEventListener("click", () => {
            window.electronAPI.openPopup(date,customString);
        });
        table.appendChild(row);
    });
}


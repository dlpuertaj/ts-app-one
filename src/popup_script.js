"use strict";


const saveButton = document.getElementById('save-button');
const deleteButton = document.getElementById('delete-button');



function saveButtonEventListener() {

    const date = new Date();
    console.log(`Button ${customString} clicked! will show and save ${date} and ${customString}`);

    window.electronAPI.addRecord(date, customString);
}

function deleteButtonEventListener() {
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

function displayRecords(records) {
    if (records.lenghth === 0) {
        displayArea.value = 'No records found.\n';
    } else {
        records.forEach(record => {
            displayArea.value += `${record.dateTime} : ${record.text}`;
        });
    }
}
function displayRecordsInTable(records) {
    console.log("Displaying in table...");
    records.forEach(record => {
        const row = document.createElement("tr");

        row.className = 'open-popup';

        row.innerHTML = `
            <td>${record.dateTime}</td>
            <td>${record.text}</td>`;

        row.addEventListener("click", () => {
            console.log(`Record: ${record.dateTime} - ${record.text}`);
        });
        table.appendChild(row);
    });
}


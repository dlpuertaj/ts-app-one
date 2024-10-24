"use strict";


const saveButton = document.getElementById('save-button');
const deleteButton = document.getElementById('delete-button');
const dateTextField = document.getElementById('date-text-field');
const dataTextField = document.getElementById('delete-button');



function saveButtonEventListener() {

    const date = new Date();
    console.log(`Button ${customString} clicked! will show and save ${date} and ${customString}`);

    window.electronAPI.addRecord(date, customString);
}

function deleteButtonEventListener() {
    window.electronAPI.addRecord(date, customString);
}


saveButton.addEventListener('click', saveButtonEventListener);
deleteButton.addEventListener('click', deleteButtonEventListener);

window.addEventListener('DOMContentLoaded', async () => {
    try {
        console.info(`Fetching records using ElectronAPI...`);
        const records = await window.electronAPI.getRecord(recordId);
        console.info(`${records.length} records found`);
        displayRecordsInPopup(record);
    } catch (error) {
        console.error('Error while calling electronAPI to fetch records'.error);
    }
});

function displayRecord(record) {
    displayArea.value = 'No records found.\n';
    displayArea.value += `${record.dateTime} : ${record.text}`;
}


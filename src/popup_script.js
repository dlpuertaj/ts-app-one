"use strict";


const saveButton = document.getElementById('save-button');
//const deleteButton = document.getElementById('delete-button');
const dateTextField = document.getElementById('popup-input-date');
const dataTextField = document.getElementById('popup-input-text');



function saveButtonEventListener() {
    // get the data from the popup
    const date = new Date();
    console.log(`Button ${customString} clicked! will show and save ${date} and ${customString}`);

    window.electronAPI.addRecord(date, customString);
}

function deleteButtonEventListener() {
    window.electronAPI.deleteRecord(recordId); //TODO: Pending implementation 
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


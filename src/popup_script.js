"use strict";


const saveButton = document.getElementById('save-button');
const deleteButton = document.getElementById('delete-button');
const dateTextField = document.getElementById('popup-input-date');
const dataTextField = document.getElementById('popup-input-text');
const hiddenField = document.getElementById('hidden-id');

// Listen for data sent from the main process
window.electronAPI.onOpenPopupData((event, { id, date, text }) => {
    console.log('Will show popup with info...')
    displayRecord(id, date, text);
});

// Function to display the received record data
function displayRecord(id, date, text) {
    console.log('Data to show:' + id + ' - ' + date + ' - ' + text)
    dateTextField.value = date;
    dataTextField.value = text;
    hiddenField.value = id;
}

// Ensure that displayRecord runs when the content is loaded
window.addEventListener('DOMContentLoaded', () => {
    console.log('Popup loaded and ready to display data');
});


function updateRecord(){
    window.electronAPI.updateRecord(hiddenField.value, dateTextField.value, dataTextField.value);
    console.info('Removing rows')
    window.electronAPI.removeTableRows();
    console.info('Opening confirmation popup')

    window.electronAPI.openConfirmationPopup("Succsessfully updated the record", false);
}

function deleteRecord(){
    console.info('Deleteing record')
    window.electronAPI.deleteRecord(hiddenField.value);
    console.info('Removing rows')
    window.electronAPI.removeTableRows();
    console.info('Opening confirmation popup')
    window.electronAPI.openConfirmationPopup("Succsessfully deleted the record", true);
}

saveButton.addEventListener('click', updateRecord);
deleteButton.addEventListener('click', deleteRecord);
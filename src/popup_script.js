"use strict";


const saveButton = document.getElementById('save-button');
const dateTextField = document.getElementById('popup-input-date');
const dataTextField = document.getElementById('popup-input-text');

// Listen for data sent from the main process
window.electronAPI.onOpenPopupData((event, { date, text }) => {
    console.log('Will show popup with info...')
    displayRecord(date, text);
});

// Function to display the received record data
function displayRecord(date, text) {
    console.log('Data to show:' + date + ' - ' + text)
    dateTextField.value = date;
    dataTextField.value = text;
}

// Ensure that displayRecord runs when the content is loaded
window.addEventListener('DOMContentLoaded', () => {
    console.log('Popup loaded and ready to display data');
});

function updateRecord(){

    
    window.electronAPI.updateRecord(id, dateTime, text);

}

saveButton.addEventListener('click',updateRecord);


"use strict";


const saveButton = document.getElementById('save-button');
//const deleteButton = document.getElementById('delete-button');
const dateTextField = document.getElementById('popup-input-date');
const dataTextField = document.getElementById('popup-input-text');



function saveButtonEventListener() {
    // get the data from the popup
    const date = new Date();
    console.log(`Saving [ ${date} , ${customString}]`);

    window.electronAPI.addRecord(date, customString);
}

//function deleteButtonEventListener() {
    //window.electronAPI.deleteRecord(recordId); //TODO: Pending implementation 
//}


saveButton.addEventListener('click', saveButtonEventListener);
//deleteButton.addEventListener('click', deleteButtonEventListener);
// Listen for data sent from the main process
window.electronAPI.onOpenPopupData((event, { date, text }) => {
    displayRecord(date, text);
});

// Function to display the received record data
function displayRecord(date, text) {
    dateTextField.value = date;
    dataTextField.value = text;
}

// Ensure that displayRecord runs when the content is loaded
window.addEventListener('DOMContentLoaded', () => {
    console.log('Popup loaded and ready to display data');
});


"use strict";


const closeButton = document.getElementById('close-button');
const continueButton = document.getElementById('continue-button');
const confirmText = document.getElementById('popup-text-confirm');


function displayElements(message,isDeleting){
    confirmText.innerHTML = message;
    if(isDeleting){
        continueButton.hidden = true;
    }
}

function closePopup(){
    window.electronAPI.closeConfirmationPopup();
}

closeButton.addEventListener('click', closePopup);
continueButton.addEventListener('click', closePopup);

window.electronAPI.onSentConfirmPopupData((event, { message, isDeleting }) => {
    console.log('Will show popup with info...')
    displayElements(message, isDeleting);
});


// Ensure that displayRecord runs when the content is loaded
window.addEventListener('DOMContentLoaded', () => {
    console.log('Confirmation Popup loaded and ready to display data');
});


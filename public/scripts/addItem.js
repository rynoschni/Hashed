'use strict'

const addItemsButton = document.getElementById('addItemsButton');
const closeAddItems = document.getElementById('closeAddItems');

document.getElementById('addItems').style.display = "none";

addItemsButton.addEventListener('click', () => {
    document.getElementById('addItemsButton').style.display = "none";
    document.getElementById('addItems').style.display = "block";
    document.getElementById('closeAddItems').style.display = "block";
});

closeAddItems.addEventListener('click', () => {
    document.getElementById('addItems').style.display = "none";
    document.getElementById('closeAddItems').style.display = "none";
    document.getElementById('addItemsButton').style.display = "block";
});
'use strict'

const addItemsButton = document.getElementById('addItemsButton');
const closeAddItems = document.getElementById('closeAddItems');

document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    document.getElementById('addItems').style.display = "none";

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {

                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');

            });
        });
    }
});

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

const buttonClick = document.querySelectorAll('.todo')

// document.addEventListener('DOMContentLoaded', ()=>{
    
const debounce = (callback, delay)=>{
    let timerId = null;
    return(...args) =>{
        clearTimeout(timerId);
        timerId = setTimeout(()=>{
            timerId = null;
            callback(...args);
        }, delay);
    };
};
// buttonClick.forEach(button=>{
//     button.addEventListener('change', (event)=>{
//         console.log('happened')
//         const data = {box: event.target.id};
//         console.log(event.target.id)
//         //const data = new FormData(document.getElementById('grocery-form'));  
//         console.log(data)  
//         debounce(fetch('/grocery/updated', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(data)
//         })
//         .then(response => response.text())
//         .then(data => {
//             console.log('Success:', data);
//         })
//         .catch((error) => {
//             console.error('Error:', error);
//         }),2000)
//         location.reload()
//     })                                        
// })



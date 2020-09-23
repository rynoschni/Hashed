'use strict'

document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

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

// const buttonClick = document.querySelectorAll('.todo')

// document.addEventListener('DOMContentLoaded', ()=>{
    
//     buttonClick.forEach(button=>{
//         button.addEventListener('click', async ()=>{
//         console.log('happened')
//         const data = {username: 'heyp'};    
//         await fetch('/grocery',{
//                 method: 'POST',
//                 body: JSON.stringify(data)
//             })
//             .then(response => response.json())
//             .then(data => {
//                 console.log('Success', data)
//             })
//             .catch((error) => {
//             console.error('Error', error)
//             })
        
//         })
//         window.location.reload();
//     })
// })
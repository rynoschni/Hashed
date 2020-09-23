'use strict'
const buttonClick = document.querySelectorAll('.todo')

document.addEventListener('DOMContentLoaded', ()=>{
    buttonClick.forEach(button=>{
        button.addEventListener('click', ()=>{
            window.location.reload();
        })
    })
})
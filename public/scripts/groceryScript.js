'use strict'
const editButton = document.querySelectorAll('.edit')

editButton.forEach((edit)=>{
    edit.addEventListener('click', e=>{
        e.preventDefault()
        console.log(edit.id)
        const edit_line = document.getElementById(edit.id)
        
    })
})
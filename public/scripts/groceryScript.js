'use strict'
const editButton = document.querySelectorAll('.edit')

editButton.forEach((edit)=>{
    edit.addEventListener('click', e=>{
        e.preventDefault()
        console.log(edit.id)
        const editLineQty = document.getElementById(`qty ${edit.id.slice(5)}`)
        const editLineUnit = document.getElementById(`unit ${edit.id.slice(5)}`)
        const editLineItem = document.getElementById(`item ${edit.id.slice(5)}`)
        const editID = document.getElementById(edit.id.slice(5))
        const updateItem = document.getElementById(`updateItem ${edit.id.slice(5)}`)
        const groceryItem = document.getElementById(`groceryItem ${edit.id.slice(5)}`)
        edit.classList.add('hide')
        updateItem.classList.remove('hide')
        editLineQty.hidden = false
        editLineUnit.hidden = false
        editLineItem.hidden = false
        editID.checked = true
        editID.hidden = true
        groceryItem.hidden = true
    })
})
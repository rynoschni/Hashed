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
        //editLineQty.classList.toggle('hide')
        editLineQty.hidden = false
        editLineUnit.hidden = false
        editLineItem.hidden = false
        editID.checked = true
    
        //editID.hidden = true
        groceryItem.hidden = true
    })
})
const groceryListItem = document.querySelectorAll(".grocery-list")

groceryListItem.forEach(list => {
    const editButton = document.getElementById(`edit ${list.id.slice(5)}`)
    const groceryQtyCheck = document.getElementById(`qty ${list.id.slice(5)}`)
    if(groceryQtyCheck.hasAttribute('hidden')){
        list.addEventListener('mouseenter', e=>{
            console.log(editButton)
            console.log(groceryQtyCheck.hasAttribute('hidden'))
            editButton.classList.toggle('hide')
        })
        list.addEventListener('mouseleave', e=>{
            console.log(editButton)
            editButton.classList.toggle('hide')
        })
    }
})  
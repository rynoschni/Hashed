'use strict'


const pantrySpans = document.querySelectorAll('.qtyChange')

pantrySpans.forEach(item => {
    item.addEventListener('click', e=>{
        e.preventDefault()
        const inputBox = document.getElementById(`qty ${item.id.slice(10)}`)
        item.hidden = true
        inputBox.classList.toggle('hide')
        console.log('clicked')
        const updateButton = document.getElementById('updateButton')
        updateButton.hidden = false
        updateButton.classList.toggle('hide')
    })
})

const pantryListItem = document.querySelectorAll(".pantry-list")

pantryListItem.forEach(list => {
    const subButton = document.getElementById(`subtract ${list.id}`)
    const addButton = document.getElementById(`add ${list.id}`)
    list.addEventListener('mouseenter', e=>{
        console.log(subButton, addButton)
        subButton.classList.toggle('hide')
        addButton.classList.toggle('hide')
    })
    list.addEventListener('mouseleave', e=>{
        console.log(subButton, addButton)
        subButton.classList.toggle('hide')
        addButton.classList.toggle('hide')
    })
})

pantryListItem.forEach(list =>{
    list.addEventListener('TouchEvent', e=>{
        const subButton = document.getElementById(`subtract ${list.id}`)
        const addButton = document.getElementById(`add ${list.id}`)   
        console.log(subButton, addButton)
        subButton.classList.toggle('hide')
        addButton.classList.toggle('hide')
    })
})
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
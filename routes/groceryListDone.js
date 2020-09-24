'use strict'
const express = require('express'),
    router = express.Router();
const theList = require('../models/groceryList')

router.get('/', async (req, res) =>{
    const groceryList = await theList.getGroceryList(req.session.user_id)
    //console.log(todos)
    res.render('template', {
        locals: {
            title:'Grocery List',
            is_logged_in: req.session.is_logged_in,
            list: groceryList,
            name: req.session.name,
        },
        partials: {
            partial:'partial-groceryList'
        }
    })
})

router.post('/', async (req, res) =>{
    if(req.body.add === 'Add'){
        console.log("add:" ,req.body)
        const response = await theList.createGroceryList(req.body, req.session.user_id)
        console.log("add response is:", response)
        await res.redirect('/grocery')
    }
    
    else if (req.body.update === 'Update'){
        if((typeof req.body.id) === 'string'){
            await theList.updateGroceryList(req.body.id, true)
        }
        else{
            for (let groceryListItem of req.body.id) {
                await theList.updateGroceryList(groceryListItem , true)
            }
        }
        console.log("req.body update",req.body)
        await res.redirect('/grocery')
        }
        
    else if (req.body.delete === 'Delete'){
        if((typeof req.body.id) === 'string'){
            await theList.removeGroceryList(req.body.id)
        }
        else{
            req.body.id.map(groceryListItem=>{
                return theList.removeGroceryList(groceryListItem)
            })
        }
        console.log("req.body delete", req.body)
        await res.redirect('/grocery')
    }
    else if (req.body.pantry === 'Pantry'){
        const groceryList = await theList.getGroceryList(req.session.user_id)
        console.log(groceryList)
        const selectedList = groceryList.filter(item=> {
            console.log(item.id)
            console.log(req.body.id)
            return req.body.id.indexOf(String(item.id)) >= 0
            })
        console.log(selectedList)
        if((typeof req.body.id) === 'string'){
            await theList.moveFromGroceryToPantry(req.body.id, req.session.user_id)
        }
        else{
            selectedList.map(groceryListItem=>{
                return theList.moveFromGroceryToPantry(groceryListItem, req.session.user_id)
            })
        }
        console.log("req.body delete", req.body)
        await res.redirect('/grocery')
    }
    else if (req.body.undo === 'Undo'){
        if((typeof req.body.id) === 'string'){
            await theList.updateGroceryList(req.body.id, false)
        }
        else{
            for (let groceryListItem of req.body.id) {
                await theList.updateGroceryList(groceryListItem , false)
            }
        }
        console.log("req.body update",req.body)
        await res.redirect('/grocery')
    }

    console.log('posted', req.body)
    await theList.updateGroceryList(req.body.box, true)
    console.log(req.session.user_id)
    const item = await theList.getGroceryListItem(req.body.box)
    console.log(item)
    if (item[0].completed){
        await theList.updateGroceryList(req.body.box, false)
    }
    else {
        await theList.updateGroceryList(req.body.box, true)
    }
    res.redirect('/grocery')
    // setTimeout(function(){res.redirect('/grocery')},1000)
})
    

module.exports = router;
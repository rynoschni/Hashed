'use strict'
const express = require('express'),
    router = express.Router();
const theList = require('../models/groceryList')

router.post('/', async (req, res) =>{
    if (req.body.pantry === 'Pantry'){
        const groceryList = await theList.getGroceryList(req.session.user_id)
        console.log(groceryList)
        const selectedList = groceryList.filter(item=> {
            console.log(item.id)
            console.log(req.body.id)
            return req.body.id.indexOf(String(item.id)) >= 0
        })
        console.log(selectedList)
        if((typeof req.body.id) === 'string'){
            await theList.moveFromGroceryToPantry(selectedList[0], req.session.user_id)
        }
        else{
            for(let groceryListItem of selectedList){
                await theList.moveFromGroceryToPantry(groceryListItem, req.session.user_id)
            }
        }
        console.log("req.body pantry", req.body)
        await res.redirect('/grocery')
    }
    else {
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
})              

module.exports = router
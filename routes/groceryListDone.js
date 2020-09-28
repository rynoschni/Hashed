'use strict'
const express = require('express'),
    router = express.Router();
const theList = require('../models/groceryList')


router.post('/', async (req, res) =>{
    if (req.body.update === "Update"){
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
    if(req.body.updateItem === 'submit'){
        console.log("edit: ",req.body.id, req.body.update)
        console.log(await theList.updateGroceryListItem(req.body.id, req.body.update))
        res.redirect('/grocery')
    }
    if (req.body.delete){
        if((typeof req.body.id) === 'string'){
            await theList.removeGroceryList(req.body.id)
        }
        else{
            for (let groceryListItem of req.body.id) {
                await theList.removeGroceryList(groceryListItem)
            }
        }
        console.log("req.body delete", req.body)
        await res.redirect('/grocery')
    }
})
    

module.exports = router;
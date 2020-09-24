'use strict'
const express = require('express'),
    router = express.Router();
const theList = require('../models/pantryList')

router.post('/', async (req, res) =>{
    if (req.body.grocery === 'Grocery'){
        const pantryList = await theList.getPantryList(req.session.user_id)
        console.log(pantryList)
        const selectedList = pantryList.filter(item=> {
            console.log(item.id)
            console.log(req.body.id)
            return req.body.id.indexOf(String(item.id)) >= 0
            })
        console.log(selectedList)
        if((typeof req.body.id) === 'string'){
            await theList.moveFromGroceryToPantry(selectedList[0], req.session.user_id)
        }
        else{
            selectedList.map(pantryListItem=>{
                return theList.moveFromGroceryToPantry(pantryListItem, req.session.user_id)
            })
        }
        console.log("req.body pantry", req.body)
        await res.redirect('/grocery')
    }
    else {
        if((typeof req.body.id) === 'string'){
            await theList.updatepantryList(req.body.id, false)
        }
        else{
            for (let pantryListItem of req.body.id) {
                await theList.updatepantryList(pantryListItem , false)
            }
        }
        console.log("req.body update",req.body)
        await res.redirect('/grocery')
    }
})              

module.exports = router
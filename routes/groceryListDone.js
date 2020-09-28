'use strict'
const express = require('express'),
    router = express.Router();
const theList = require('../models/groceryList')


router.post('/', async (req, res) =>{
    if (req.body.id){    
        if(req.body.updateItem === 'submit'){
            const groceryList = await theList.getGroceryListIDs(req.session.user_id)
            let start = 0
            for (let i = 0; i < groceryList.length; i++){
                console.log(groceryList[i].id)
                groceryList[i].id === Number(req.body.id) ? start = i : 0
            }
            start *= 3
            console.log("edit: ",req.body, groceryList, start)
            await theList.updateGroceryListItem(req.body.id, req.body.update[start+2], req.body.update[start], req.body.update[start+1])
            res.redirect('/grocery')
        }
        if (req.body.updateChecked){
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
    }
    else {
        res.redirect('/grocery')
    }
})
    

module.exports = router;
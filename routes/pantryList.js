'use strict'
const express = require('express'),
    router = express.Router();
const theList = require('../models/pantryList')
router.get('/', async (req, res) =>{
    const pantryList = await theList.getPantryList(req.session.user_id)
    //console.log(todos)
    res.render('template', {
        locals: {
            title:'Pantry List',
            is_logged_in: req.session.is_logged_in,
            list: pantryList,
            name: req.session.name,
            baseUrl: req.baseUrl
        },
        partials: {
            partial:'partial-pantryList'
        }
    })
})

router.post('/', async (req, res) =>{
    if (req.body.update === 'Update'){
        for (let id in req.body){
            if (id !== 'update'){
                await theList.updatePantryList(id, req.body[id])
            }
        }
        console.log(req.body)
        await res.redirect('/pantry')
    }

    if (req.body.add === 'Add'){
        for (let id in req.body){
            if (id !== 'add'){
                await theList.incrementPantryItem(id, req.body[id])
            }
        }
        console.log(req.body)
        await res.redirect('/pantry')
    }

    if (req.body.subtract === 'Subtract'){
        for (let id in req.body){
            if (id !== 'subtract'){
                await theList.decrementPantryItem(id, req.body[id])
            }
        }
        console.log(req.body)
        await res.redirect('/pantry')
    }




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
            await theList.moveFromPantryToGrocery(selectedList[0], req.session.user_id)
        }
        else{
            selectedList.map(pantryListItem=>{
                return theList.moveFromPantryToGrocery(pantryListItem, req.session.user_id)
            })
        }
        console.log("req.body pantry", req.body)
        await res.redirect('/grocery')
    }   
    if (req.body.delete === 'Delete'){
        if((typeof req.body.id) === 'string'){
            await theList.removePantryList(req.body.id)
        }
        else{
            req.body.id.map(pantryListItem =>{
                return theList.removePantryList(pantryListItem)
            })
        }
        console.log(req.body)
        await res.redirect('/pantry')
    }
})
    
module.exports = router;
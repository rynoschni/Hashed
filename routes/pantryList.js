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
            name: req.session.name
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
        
    else{
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
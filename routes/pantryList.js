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
            list: pantryList
        },
        partials: {
            partial:'partial-pantryList'
        }
    })
})

router.post('/', async (req, res) =>{
    if(req.body.add === 'Add'){
        console.log("add:" ,req.body)
        const response = await theList.createPantryList(req.body, req.session.user_id)
        console.log(response)
        await res.redirect('/pantry')
    }
    // else if (req.body.update === 'Update'){
    //     if((typeof req.body.id) === 'string'){
    //         theList.updatePantryList(req.body.id, true)
    //     }
    //     else{
    //         req.body.id.map(pantryListItem =>{
    //             return theList.updatePantryList(pantryListItem , true)
    //         })
    //     }
    //     console.log(req.body)
    //     await res.redirect('/pantry')
    // }
        
    else if (req.body.delete === 'Delete'){
        if((typeof req.body.id) === 'string'){
            theList.removePantryList(req.body.id)
        }
        else{
            req.body.id.map(pantryListItem =>{
                return theList.removePantryList(pantry_id)
            })
        }
        console.log(req.body)
        await res.redirect('/pantry')
    }
})
    
module.exports = router;
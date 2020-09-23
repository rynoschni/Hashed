'use strict'
const express = require('express'),
    router = express.Router();
const theList = require('../models/groceryList')

router.post('/', async (req, res) => {
    if (req.body.add === 'Add') {
        console.log("add:", req.body)
        const response = await theList.createGroceryList(req.body, req.session.user_id)
        console.log(response)
        await res.redirect('/grocery')
    }
    else if (req.body.update === 'Update') {
        if ((typeof req.body.id) === 'string') {
            theList.updateGroceryList(req.body.id, true)
        }
        else {
            req.body.id.map(groceryListItem => {
                return theList.updateGroceryList(groceryListItem, true)
            })
        }
        console.log(req.body)
        await res.redirect('/grocery')
    }

    else if (req.body.delete === 'Delete') {
        if ((typeof req.body.id) === 'string') {
            theList.removeGroceryList(req.body.id)
        }
        else {
            req.body.id.map(groceryListItem => {
                return theList.removeGroceryList(shopping_id)
            })
        }
        console.log(req.body)
        await res.redirect('/grocery')
    }
})

module.exports = router;
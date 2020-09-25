'use strict'
const express = require('express'),
    router = express.Router();
const theList = require('../models/groceryList')

router.post('/', async (req, res) =>{
    

    console.log('posted', req.body)
    //await theList.updateGroceryList(req.body.box, true)
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
    //setTimeout(function(){res.redirect('/grocery')},1000)
})
    

module.exports = router;
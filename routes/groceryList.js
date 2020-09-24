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
    

    // console.log('posted', req.body)
    // await theList.updateGroceryList(req.body.box, true)
    // console.log(req.session.user_id)
    // const item = await theList.getGroceryListItem(req.body.box)
    // console.log(item)
    // if (item[0].completed){
    //     await theList.updateGroceryList(req.body.box, false)
    // }
    // else {
    //     await theList.updateGroceryList(req.body.box, true)
    // }
    // res.redirect('/grocery')
    // setTimeout(function(){res.redirect('/grocery')},1000)
})
    

module.exports = router;
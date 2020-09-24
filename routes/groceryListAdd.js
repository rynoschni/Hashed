'use strict'
const express = require('express'),
    router = express.Router();
const theList = require('../models/groceryList')


router.post('/', async (req, res) =>{
    console.log("add:" ,req.body)
    const response = await theList.createGroceryList(req.body, req.session.user_id)
    console.log("add response is:", response)
    await res.redirect('/grocery')
})
    

module.exports = router;
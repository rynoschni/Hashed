'use strict'
const express = require('express'),
    router = express.Router();
const theList = require('../models/recipesList')


router.post('/', async (req, res) => {
    console.log("delete:", req.body)
    const response = await theList.removeReceipe(req.body.delete)
    console.log("delete response is:", response)
    await res.redirect('/recipes')
})

module.exports = router;
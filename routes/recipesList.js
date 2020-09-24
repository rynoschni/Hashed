'use strict'
const express = require('express'),
    router = express.Router();
const theList = require('../models/recipesList')

router.get('/', async (req, res) => {
    res.render('template', {
        locals: {
            title: 'Recipes List',
            is_logged_in: req.session.is_logged_in,
            list: recipesList,
            name: req.session.name,
        },
        partials: {
            partial: 'partial-recipes'
        }
    })
})

module.exports = router;
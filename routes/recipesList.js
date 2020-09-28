'use strict'
const express = require('express'),
    router = express.Router();
const theList = require('../models/recipesList')

router.get('/:name?', async (req, res) => {
    if (req.session.is_logged_in === true) {
        if(req.params.name === undefined){
            const recipesList = await theList.getRecipesList(req.session.user_id)
            res.render('template', {
                locals: {
                    title: 'Recipes List',
                    is_logged_in: req.session.is_logged_in,
                    list: recipesList,
                    name: req.session.name,
                    baseUrl: req.baseUrl
                },
                partials: {
                    partial: 'partial-recipesList',
                    scripts: 'partial-recipe-scripts'
                }
            })
        } else {
            const recipeDetails = await theList.getRecipeValues(req.params.name)
            console.log(recipeDetails)
            res.render('template', {
                locals: {
                    title: recipeDetails[0].title,
                    is_logged_in: req.session.is_logged_in,
                    data: recipeDetails[0],
                    name: req.session.name,
                    recipe_id: req.params.name,
                    baseUrl: req.baseUrl
                },
                partials: {
                    partial: 'partial-recipes',
                    scripts: 'partial-recipe-scripts'
                }
            })
        }
    } else {
        res.redirect('/');
    }
})



router.post('/', async (req, res) => {
    console.log("add:", req.body)
    const response = await theList.createRecipe(req.body, req.session.user_id)
    console.log("add response is:", response)
    await res.redirect('/recipes')
})

module.exports = router;
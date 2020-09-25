'use strict'
const express = require('express'),
    router = express.Router();
const theList = require('../models/recipesList')

router.get('/:name?', async (req, res) => {
    if(req.params.name === undefined){
        const recipesList = await theList.getRecipesList(req.session.user_id)
        res.render('template', {
            locals: {
                title: 'Recipes List',
                is_logged_in: req.session.is_logged_in,
                list: recipesList,
                name: req.session.name,
                url: req.baseUrl
            },
            partials: {
                partial: 'partial-recipesList'
            }
        })
    } else {
        const recipeDetails = await theList.getRecipeValues(req.params.name)
        console.log(recipeDetails)
        res.render('template', {
            locals: {
                title: recipeDetails.title,
                is_logged_in: req.session.is_logged_in,
                data: recipeDetails[0],
                name: req.session.name,
                recipe_id: req.params.name
            },
            partials: {
                partial: 'partial-recipes'
            }
        })
    }
})

// When adding a recipe from api to database, grab all of extendedIngredients and add as single object. Pulling from database will only call the info that is also created when manually creating recipe.
// {
//     "extendedIngredients": [
//         {
//             "id": 1001,
//             "measures": {
//                 "metric": {
//                     "amount": 1.0,
//                     "unitLong": "Tbsp",
//                 },
//                 "us": {
//                     "amount": 1.0,
//                     "unitLong": "Tbsp",
//                 }
//             },
//             "name": "butter",
//             "original": "1 tbsp butter",
//         },
//     ]
// }

router.post('/', async (req, res) => {
    console.log("add:", req.body)
    const response = await theList.createRecipe(req.body, req.session.user_id)
    console.log("add response is:", response)
    await res.redirect('/recipes')
})

module.exports = router;
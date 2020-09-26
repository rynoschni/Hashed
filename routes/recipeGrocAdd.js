'use strict'
const express = require('express'),
    router = express.Router();
const theRecipe = require('../models/recipesList')
const grocList = require('../models/groceryList')
router.post('/:name?', async (req, res) =>{
    const recipe = await theRecipe.getRecipeValues(req.params.name)
    console.log(recipe)
    const ingredients = recipe[0].ingred.split(':')
    let ingredObjArr = ingredients.map(ingredient => {
        let ingredArr = ingredient.split(',')
        return {qty: ingredArr[0], unit: ingredArr[1], groceries: ingredArr[2], recipe_id: req.params.name}
    })
    console.log(ingredObjArr)
    const mapItem = async () =>{
        for (let ingred of ingredObjArr) {
            await grocList.createGroceryList(ingred, req.session.user_id)
        }
        // ingredObjArr.map(ingred => {
        //     return grocList.createGroceryList(ingred, req.session.user_id)
        // })
    }
    await mapItem()
    res.redirect('/grocery')
})              

module.exports = router
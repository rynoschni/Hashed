'use strict'
const express = require('express'),
    router = express.Router();
const theRecipe = require('../models/recipesList')
const grocList = require('../models/groceryList')
router.post('/:name?', async (req, res) =>{
    const recipe = await theRecipe.getRecipeValues(req.params.name)
    console.log(recipe)
    
    // const selectedList = pantryList.filter(item=> {
    //     console.log(item.id)
    //     console.log(req.body.id)
    //     return req.body.id.indexOf(String(item.id)) >= 0
    //     })
    // console.log(selectedList)
    // if((typeof req.body.id) === 'string'){
    //     await theRecipe.moveFromGroceryToPantry(selectedList[0], req.session.user_id)
    // }
    // else{
    //     selectedList.map(pantryListItem=>{
    //         return theRecipe.moveFromGroceryToPantry(pantryListItem, req.session.user_id)
    //     })
    // }
    // console.log("req.body recipe", req.body)
    await res.redirect('/grocery')
    
})              

module.exports = router
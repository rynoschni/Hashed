const express = require('express'),
    router = express.Router();
const theList = require('../models/pantryList')
router.post('/', async (req, res) =>{
    if(req.body.add === 'Add'){
        console.log("add:" ,req.body)
        const response = await theList.createPantryList(req.body, req.session.user_id)
        console.log(response)
        await res.redirect('/pantry')
    }
})
    
module.exports = router;
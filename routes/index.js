'use strict'
const express = require('express'),
    router = express.Router();
const User = require('../models/userLogs');

router.get('/', async (req, res) =>{
    res.render('template', {
        locals: {
            title:'Welcome',
        },
        partials: {
            partial:'partial-home'
        }
    })
})

router.get('/logout', (req, res) =>{
    req.session.destroy();
    res.redirect('/')
})

router.post("/", (req, res)=>{
    const {  email , password } = req.body
    const userInstance = new User(null, null, email, password);
    userInstance.login().then(response => {
        req.session.is_logged_in = response.isValid;
        console.log(req.session.is_logged_in)
        if (!!response.isValid){
            const {name, user_id}= response;
            req.session.name = `${name}`;
            req.session.user_id = user_id;
            console.log("session: ", req.session)
            res.redirect('/grocery')
        }else {
            res.sendStatus(401)
        }
    })
})


module.exports = router
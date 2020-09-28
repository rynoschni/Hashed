'use strict'
const express = require('express'),
    router = express.Router(),
    bcrypt = require('bcryptjs');
const User = require('../models/userLogs');

router.get('/', async (req, res) =>{
    if(req.session.is_logged_in){
        res.redirect('/')
    }else{
        res.render('template', {
            locals: {
                title:'Sign Up',
                is_logged_in: req.session.is_logged_in,
                baseUrl: req.baseUrl
            },
            partials: {
                partial:'partial-signup',
                scripts: 'partial-empty'
            }
        })
    }
})

router.post('/', async (req, res) => {
    console.log(req.body)
    const { name, email, password } = req.body;
    //SALTing the HASH
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt)

    const userInstance = new User(null, name, email, hash)
    userInstance.save().then(response =>{
        if (response.id !== undefined){
            res.redirect('/login')
        }else {
            res.redirect('back')
        }
    })
})

module.exports = router
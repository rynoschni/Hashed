'use strict'
const express = require('express'),
    router = express.Router(),
    bcrypt = require('bcryptjs');
const User = require('../models/userLogs');

router.get('/', async (req, res) => {
    if (req.session.is_logged_in === true) {
        res.render('template', {
            locals: {
                title: `Welcome ${req.session.name}!`,
                name: req.session.name,
                email: req.session.email,
                is_logged_in: req.session.is_logged_in,
                url: req.baseUrl,
                baseUrl: req.baseUrl
            },
            partials: {
                partial: 'partial-userHome',
                scripts: 'partial-empty'
            }
        })
    } else {
        res.redirect('/');
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/')
})

router.post('/', async (req, res) => {
    const user_id = req.session.user_id;
    const { name, email, password } = req.body;
    //SALTing the HASH
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const userInstance = new User(user_id, name, email, hash);
    userInstance.update().then(response =>{
        res.redirect('/home');
    })
});


module.exports = router
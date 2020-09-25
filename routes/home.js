'use strict'
const express = require('express'),
    router = express.Router();
const User = require('../models/userLogs');

router.get('/', async (req, res) => {
    res.render('template', {
        locals: {
            title: `Welcome! You're logged in!`,
            name: req.session.name,
            is_logged_in: req.session.is_logged_in,
            url: req.baseUrl,
            baseUrl: req.baseUrl
        },
        partials: {
            partial: 'partial-userHome',
            scripts: 'partial-empty'
        }
    })
})

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/')
})

router.post("/", (req, res) => {
    const { email, password } = req.body
    const userInstance = new User(null, null, email, password);
    userInstance.login().then(response => {
        req.session.is_logged_in = response.isValid;
        console.log(req.session.is_logged_in)
        if (!!response.isValid) {
            const { name, user_id } = response;
            req.session.name = `${name}`;
            req.session.user_id = user_id;
            console.log("session: ", req.session)
            res.redirect('/home')
        } else {
            res.sendStatus(401)
        }
    })
})


module.exports = router
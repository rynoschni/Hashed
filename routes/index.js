'use strict'
const express = require('express'),
    router = express.Router();
const User = require('../models/userLogs');

router.get('/', async (req, res) =>{
    res.render('template', {
        locals: {
            title:'Welcome to Hashed!',
            is_logged_in: req.session.is_logged_in,
            url: req.baseUrl,
            baseUrl: req.baseUrl

        },
        partials: {
            partial:'partial-home',
            scripts: 'partial-empty'
        }
    })
})

router.get('/logout', (req, res) =>{
    req.session.destroy();
    res.redirect('/')
})

module.exports = router
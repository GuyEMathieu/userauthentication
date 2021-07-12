const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator')
const { v4: uid } = require('uuid');

// @route       GET api/auth
// @desc        get logged in user
// @access      Private
router.get('/', (req, res) => {
    res.send('Get logged in user')
})

// @route       POST api/auth
// @desc        Authenticate user and get token
// @access      Public
router.post('/', (req, res) => {
    res.send('Log in user')
})


module.exports = router
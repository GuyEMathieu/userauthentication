const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator')
const { v4: uid } = require('uuid');
const bcrypt = require('bcryptjs');
const User = require('./User')
const jwt = require('jsonwebtoken')
const config = require('config')

// @route       GET api/auth
// @desc        get logged in user
// @access      Private
router.get('/', (req, res) => {
    res.send('Get logged in user')
})

// @route       POST api/auth
// @desc        Authenticate user and get token
// @access      Public
router.post('/', 
    [
        check('username', 'A valid username is required').not().isEmpty(),
        check('password', 'A valid username is required with 6 or more characters')
            .isLength({min: 6})
    ],
    async (req, res) => {
        res.send('Log in user')
    }
)


module.exports = router
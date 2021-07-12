const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator')
const { v4: uid } = require('uuid');

// @route       Post api/users
// @desc        Register a user
// @access      Public
router.post('/', (req, res) => {
    res.send('Register a User')
})

module.exports = router
const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator')
const { v4: uid } = require('uuid');
const bcrypt = require('bcryptjs');
const User = require('./User')
const jwt = require('jsonwebtoken')
const colors = require('colors')
const config = require('config')
const auth = require('./auth')
const Employee = require('../employeeRoutes/Employee')

// @route       GET api/auth
// @desc        get logged in user
// @access      Private
router.get('/', auth, async (req, res) => {
    try{
        
        const user = await User.findById(req.user.id)
            .select('-password')
            .select('-lastModified')
            .select('-__v')

            
        let data = {
            _id: user._id,
            username: user.username
        }
        data.employee = await Employee.findOne({user: user._id})
            .select('-lastModified')
            .select('-__v')
        res.json(data)
    } catch(err){
        console.error(err.message.underline.red.bold);
        res.status(500).send('Server Error')
    }
})


// @route       Post api/auth
// @desc        Change user password
// @access      Private
// router.patch('/',[auth, 
//     [
//         check('currentPassword', 'Please enter your current Password').isLength({min: 6}),
//         check('newPassword', 'Please enter your new Password').isLength({min: 6})
//     ]], async (req, res) => {
//         if(!validationResult(req).isEmpty()){
//             const _raw = validationResult(req).array();
//             let alerts = []
//             for(let i = 0; i < _raw.length; i++){
//                 alerts.push({severity: 'error', msg: _raw[i].msg, _id: uid()})
//             }

//             return res.status(400).json({alerts: alerts})
//         }

//         const {currentPassword, newPassword} = req.body;
//     }
// )


// @route       POST api/auth
// @desc        Authenticate user and get token
// @access      Public
router.post('/', 
    [
        check('username', 'A valid username is required').not().isEmpty(),
        check('password', 'A valid password is required with 6 or more characters')
            .isLength({min: 6})
    ],
    async (req, res) => {

        if(!validationResult(req).isEmpty()){
            const _raw = validationResult(req).array();
            let alerts = []
            for(let i = 0; i < _raw.length; i++){
                alerts.push({severity: 'error', msg: _raw[i].msg, _id: uid()})
            }

            return res.status(400).json({alerts: alerts})
        }

        const {username, password} = req.body;
        try {
            let user = await User.findOne({username});

            if(!user){
                return res.status(400).json({alerts: [{severity: 'error', msg: 'Invalid username and/or password', _id: uid()}]})
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if(!isMatch){
                return res.status(400).json({alerts: [{severity: 'error', msg: 'Invalid username and/or password', _id: uid()}]})
            }

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload, config.get('jwtSecret'), {
                expiresIn: 360000
            }, (err, token) => {
                if(err) throw err;
                res.json({token})
            })



        } catch(err){
            console.error(err.message.underline.red.bold);
            res.status(500).send('Server Error')
        }
    }
)


module.exports = router
const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator')
const { v4: uid } = require('uuid');
const bcrypt = require('bcryptjs');
const User = require('./User')
const jwt = require('jsonwebtoken')
const config = require('config')

// @route       Post api/users
// @desc        Register a user
// @access      Public
router.post('/', 
    [
        check('username', 'A valid username is required').not().isEmpty(),
        check('password', 'A valid username is required with 6 or more characters')
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

            if(user){
                return res.status(400).json({alerts: [{severity: 'error', msg: 'User already exists', _id: uid()}]})
            }

            user = new User({username, password});

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

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
const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator')
const { v4: uid } = require('uuid');
const bcrypt = require('bcryptjs');
const User = require('../users_auth_routes/User')
const jwt = require('jsonwebtoken')
const config = require('config')
const Employee = require('./Employee')
const auth = require('../users_auth_routes/auth')


// @route       GET api/employees
// @desc        get all employees
// @access      Private
router.get('/', auth, async (req, res) => {
    try{
        const employees = await Employee.find()
            .select('-lastModified')
            .select('-__v')
        res.json(employees)
    } catch(err){
        console.error(err.message.underline.red.bold);
        res.status(500).send('Server Error')
    }
})

// @route       POST api/employees
// @desc        Create employee
// @access      Private
router.post('/', [auth, [
        check('firstName', 'A valid first Name is required').not().isEmpty(),
        check('lastName', 'A valid last Name is required').not().isEmpty(),
        check('dateOfBirth', 'A valid Date of Birth is required').not().isEmpty()
    ]]    
    , async (req, res) => {

        if(!validationResult(req).isEmpty()){
            const _raw = validationResult(req).array();
            let alerts = []
            for(let i = 0; i < _raw.length; i++){
                alerts.push({severity: 'error', msg: _raw[i].msg, _id: uid()})
            }

            return res.status(400).json({alerts: alerts})
        }

        const {firstName, lastName, dateOfBirth} = req.body;
    try{
        let employee = await Employee.findOne({firstName, lastName, dateOfBirth});

        if(employee){
            return res.status(400).json({alerts: [{severity: 'error', msg: 'Employee already exists', _id: uid()}]})
        }

        let employeeNumber = 0;
        let unused = false;
        while(unused === false){
            employeeNumber = Math.floor(Math.random() * 5000) + 1;

            const existing = await Employee.findOne({employeeNumber})

            if(!existing) {
                unused = true;
            }
        }

        // Creating employee credentials
        const username = `${firstName}${employeeNumber}`
        let password = `${firstName}.${lastName}`
        let _user = new User({
            username: username,
            password: password
        })

        const salt = await bcrypt.genSalt(10);
        _user.password = await bcrypt.hash(_user.password, salt)
        

        await _user.save();

        //Create employee

        employee = new Employee({
            firstName: firstName,
            lastName: lastName,
            employeeNumber: employeeNumber,
            dateOfBirth: dateOfBirth,
            user: _user._id,
        })

        await employee.save();

        res.json(employee)
    } catch(err){
        console.error(err.message.underline.red.bold);
        res.status(500).send('Server Error')
    }
})

// @route       GET api/employees
// @desc        get an employeeById
// @access      Private
router.get('/:id', auth, async (req, res) => {
    try{
        const employee = await Employee.findById(req.params.id)
            .select('-lastModified')
            .select('-__v')
        res.json(employee)
    } catch(err){
        console.error(err.message.underline.red.bold);
        res.status(500).send('Server Error')
    }
})

// @route       GET api/employees
// @desc        get an employeeById
// @access      Private
router.patch('/:id', auth, async (req, res) => {

    const {firstName, lastName, dateOfBirth, phoneNumber} = req.body;

        let employeeFields = {}

        if(firstName) employeeFields.firstName = firstName;
        if(lastName) employeeFields.lastName = lastName;
        if(dateOfBirth) employeeFields.dateOfBirth = dateOfBirth;
        if(phoneNumber) employeeFields.phoneNumber = phoneNumber;

    try{
        let employee = await Employee.findById(req.params.id)

        if(!employee){
            return res.status(400).json({alerts: [{severity: 'error', msg: 'Employee does not exist', _id: uid()}]})
        }

        if(employee.user.toString() !== req.user.id) {
            return res.status(401).json({alerts: [{severity: 'error', msg: 'Unauthorized Action', _id: uid()}]})
        }

        employee = await Employee.findByIdAndUpdate(req.params.id,
            { $set: employeeFields},
            {new: true})

        
    } catch(err){
        console.error(err.message.underline.red.bold);
        res.status(500).send('Server Error')
    }
})


module.exports = router
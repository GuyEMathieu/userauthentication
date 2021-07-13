const jwt = require('jsonwebtoken')
const config = require('config')
const { v4: uid } = require('uuid');

module.exports = function(req, res, next) {
    // Get token from header

    const token = req.header('x-auth-token');

    // Check if not token
    if(!token){
        return res.status(401).json({alerts: [
            {
                severity: 'error', msg: 'Unauthorized User, Access Denied',  _id: uid()
            }
        ]})
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded.user;
        next();
    } catch(err){
        return res.status(401).json({alerts: [{ severity: 'error', msg: 'Unauthorized Access', _id: uid() }]})
    }
}
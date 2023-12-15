const {body} = require('express-validator');

const registerValidator = [
    body('email','Email arleady used!' ).isEmail().isString(),
    body('name','Name arleady used!' ).isEmail().isString(),
    body('password','Password has been 3+ character').isLength({min:3}).isString(),
]

const loginValidator = [
    body('name','Incorect login!' ).isEmail(),
    body('email','Incorect login!' ).isEmail(),
    body('password','Incorect password').isLength({min:3}).isString(),
]
module.exports = {
    registerValidator,
    loginValidator
}

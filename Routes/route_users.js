const express = require("express");
const userRouter = express.Router();
const controllerUsers = require('../Controllers/controller_users.js')
const { validationResult, body } = require('express-validator')

/* Login */
userRouter.post('/login', function (req, res) {
    controllerUsers.login(req, res);
});

/* Register */
userRouter.post('/register', [
    body('username').notEmpty().escape(), 
    body('password').notEmpty().escape(),
    body('email').notEmpty().escape() 
],  function (req, res) {
    const errors = validationResult(req); 
    if (errors.isEmpty()) {
        controllerUsers.register(req, res); 
    } else {
        res.status(404).json({errors: errors.array()})
    }
})



module.exports = userRouter;
const express = require('express')
const { registerController, loginController, forgotController } = require('../controller/authController')

//router object
const router = express.Router()

//route
//Register||Post
router.post('/register', registerController)

//Login||Post
router.post('/login', loginController)

//Forgot Password||Post
router.post('/forgot-password', forgotController)

module.exports = router;
const userModel = require("../model/userModel");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const registerController = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await userModel.findOne({ username: username })

        //validation
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: 'User already exists'
            })
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await userModel.create({
            username: username,
            email: email,
            password: hashedPassword,

        })
        //generate token
        const token = jwt.sign({ username: result.username, id: result._id }, process.env.JWT_SECRET);




        return res.status(201).send({
            user: result,
            token: token,
            success: true,
            message: 'Registered Successfully',

        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Register API',
            error
        })
    }
}

//login call back
const loginController = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userModel.findOne({ username: req.body.username })

        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            })
        }


        //Compare password 
        const matchPassword = await bcrypt.compare(password, user.password);

        if (!matchPassword) {
            return res.status(400).json({ message: 'Invalid Username or Password' })
        }

        const token = jwt.sign({ username: user.username, id: user._id }, process.env.JWT_SECRET);

        return res.status(200).send({
            success: true,
            message: 'Login Successfully',
            user: user,
            token: token,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Login API',
            error
        })
    }
};

//forgot password
const forgotController = async (req, res) => {
    try {
        const userData = await userModel.findOne({ username: req.body.username })
        if (userData) {

            res.status(200).send({
                success: true,
                message: 'Forgot Password!',

            })
        }
        else {
            res.status(200).send({
                success: true,
                message: 'This username does not exists.',

            })
        }


    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: 'Error in Forgot API',
            error
        })
    }
}



module.exports = { registerController, loginController, forgotController };
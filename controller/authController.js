const userModel = require("../model/userModel");


const registerController = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ username: req.body.username })

        //validation
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: 'User already exists'
            })
        }

        //rest data
        const user = new userModel(req.body)
        await user.save()
        return res.status(201).send({
            success: true,
            message: 'Registered Successfully',
            user,
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
    try {
        const user = await userModel.findOne({ username: req.body.username })

        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            })
        }

        return res.status(200).send({
            success: true,
            message: 'Login Successfully',
            user,
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
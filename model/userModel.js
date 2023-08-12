const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: [true, "email is required"],
        unique: true
    },
    username: {
        type: String,
        require: [true, "username is required"]
    },
    password: {
        type: String,
        require: [true, "password is required"]
    },

},
    { timestamps: true }
);
module.exports = mongoose.model("users", userSchema);
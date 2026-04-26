const mongoose = require('mongoose')
const validator =require('validator')
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,

    },
    emailId: {
        type: String,
        required: true,
        unique: false,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
    }
})


module.exports = mongoose.model("User", userSchema)
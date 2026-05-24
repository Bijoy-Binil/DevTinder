const mongoose = require('mongoose')
const validator = require('validator')
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
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        message: `{VALUE} is not a valid gender`
    },
    photo_url: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        validate: {
            validator: function (v) {
                return validator.isURL(v);
            },
            message: `{VALUE} is not a valid URL`
        }
    },
    age: {
        type: Number,
        min: 0,
        max: 120
    },
    about: {
        type: String,
        maxlength: 500
    },
    skills: {
        type: [String],
        default: [],
    },
    isActive: {
        type: Boolean,
        default: true,
    },
})

module.exports = mongoose.model("User", userSchema)

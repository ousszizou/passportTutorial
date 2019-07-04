const mongoose = require('mongoose')
const Schema = mongoose.Schema

// user schema

const userSchema = new Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    }
})

const User = mongoose.model('user', userSchema)

module.exports = User
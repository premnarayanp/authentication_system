const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    mobileNum: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }

}, {
    timestamps: true
});


const User = mongoose.model('User', userSchema);

module.exports = User;

// firstName: {
//     type: String,
//     required: true,
// },

// lastName: {
//     type: String,
//     required: true,
// },
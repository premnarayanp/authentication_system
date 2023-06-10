const mongoose = require('mongoose');
const otpSchema = new mongoose.Schema({
    mail: {
        type: String,
        required: true,
    },

    otp: {
        type: String,
        required: true,
    },
    expireTime: {
        type: Number,
        required: true,
    }

}, {
    timestamps: true
});


const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP;
const mongoose = require('mongoose');
const captchaSchema = new mongoose.Schema({
    ipAddress: {
        type: String,
        required: true,
    },

    captcha: {
        type: String,
        required: true,
    },

}, {
    timestamps: true
});


const Captcha = mongoose.model('Captcha', captchaSchema);

module.exports = Captcha;
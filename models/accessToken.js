const mongoose = require('mongoose');
const accessTokenSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },

    accessToken: {
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


const AccessToken = mongoose.model('AccessToken', accessTokenSchema);

module.exports = AccessToken;
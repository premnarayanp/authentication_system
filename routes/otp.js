const express = require('express');
const router = express.Router();
const otpController = require('../controllers/otp_controller');

router.get('/send/:mailId', otpController.send);
router.get('/resend/:otpId', otpController.resend);

module.exports = router;
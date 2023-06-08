const express = require('express');
const router = express.Router();
const captchaController = require('../controllers/captcha_controller');

router.get('/generate', captchaController.generate);
router.get('/re_generate/:id', captchaController.re_generate);

module.exports = router;
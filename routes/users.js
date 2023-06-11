const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/users_controller');

router.get('/sign-in', userController.signIn);
router.get('/sign-up', userController.signUp);
router.get('/sign-out', userController.destroySession);
router.post('/create', userController.create);
router.get('/forget', userController.forget);
router.post('/forget/password', userController.forgetPassword);
router.get('/reset/password/link', userController.sendResetLink);
router.get('/reset/pass_form/:token', userController.sendResetForm);
router.post('/reset/password', userController.resetPassword);

//use passport as middleware to authenticate
router.post('/create_session', passport.authenticate(
    'local', { failureRedirect: '/users/sign-in' },
), userController.createSession);



router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate(
    'google', { failureRedirect: '/users/sign-in' },
), userController.createSession);

module.exports = router;
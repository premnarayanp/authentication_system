const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/users_controller');

router.get('/sign-in', userController.signIn);
router.get('/sign-up', userController.signUp);
router.get('/sign-out', userController.destroySession);
router.post('/create', userController.create);

//use passport as middleware to authenticate
router.post('/create_session', passport.authenticate(
    'local', { failureRedirect: '/users/sign-in' },
), userController.createSession);


module.exports = router;
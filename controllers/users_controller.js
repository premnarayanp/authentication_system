// const User = require('../models/user');

//render Sign in Page
module.exports.signIn = function(req, res) {

    return res.render('user_sign_in', {
        title: "Authentication System | SignIn",
    });
};

//render Sign Up Page
module.exports.signUp = function(req, res) {
    return res.render('user_sign_up', {
        title: "Authentication System | SignUp",
    });
};


//create user or SignUp
module.exports.create = async function(req, res) {
    console.log(req.body);
    if (req.body.password != req.body.confirmPassword) {
        return res.redirect('back');
    }

    return res.redirect('/users/sign-in');

}

// sign in and create a session for the user
module.exports.createSession = function(req, res) {
    return res.redirect('/');
}

//logout
module.exports.destroySession = function(req, res) {
    console.log("==================logout========================");
    return res.redirect('/users/sign-in');

}
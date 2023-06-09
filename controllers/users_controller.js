const User = require('../models/user');
const Captcha = require('../models/captcha');

//render Sign in Page
module.exports.signIn = function(req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    //console.log("===========logout Noty===============");
    return res.render('user_sign_in', {
        title: "authentication_system | SignIn",
    });
};

//render Sign Up Page
module.exports.signUp = function(req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    return res.render('user_sign_up', {
        title: "authentication_system | SignUp",
    });
};


//create user or SignUp
module.exports.create = async function(req, res) {
    const userBody = req.body;

    if (!userBody.name || !userBody.email || !userBody.password || !userBody.confirmPassword || !userBody.captcha) {
        //console.log("please fill all fields");
        req.flash('error', 'please fill all fields....');
        return res.redirect('back');
    }

    if (req.body.password != req.body.confirmPassword) {
        //console.log("confirm password not same");
        req.flash('error', 'confirm password not same....');
        return res.redirect('back');
    }

    try {
        const ipAddress = req.header('x-forwarded-for') || req.socket.remoteAddress;
        const captcha = await Captcha.findById(userBody.captchaId);
        if (captcha && captcha.captcha == userBody.captcha && captcha.ipAddress == ipAddress) {
            console.log("==========captcha is same==================");
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                try {
                    const user = await User.create(req.body);
                    // console.log("user", user);
                    req.flash('success', 'Successfully SignUp ,Now Please Login');
                    return res.redirect('/users/sign-in');

                } catch (error) {
                    console.log('error in creating user while signing up');
                    console.log(error);
                    return;
                }

            } else {
                //console.log("User Already Exist");
                req.flash('error', 'User Already Exist....');
                return res.redirect('back');
            }
        } else {
            //console.log("you enter Wrong Captcha");
            req.flash('error', 'you enter Wrong Captcha....');
            return res.redirect('back');
        }




    } catch (error) {
        console.log('error in finding user in signing up');
        console.log(error);
        return;
    }
}

// sign in and create a session for the user
module.exports.createSession = function(req, res) {
    req.flash('success', 'Logged in successfully');
    return res.redirect('/');
}

//logout
module.exports.destroySession = function(req, res) {
    req.logout(function(err) {
        if (err) {
            console.log('Error:-' + err);
            return;
        }

        //req.flash('success', 'You have successfully logged out');
        return res.redirect('/users/sign-in');
    });
    return res.redirect('/users/sign-in');
}

//render Forget Page
module.exports.forget = function(req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    //console.log("===========logout Noty===============");
    return res.render('user_forget_password', {
        title: "Forget Password",
    });
};
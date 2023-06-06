const User = require('../models/user');

//render Sign in Page
module.exports.signIn = function(req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }

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
    if (!userBody.firstName || !userBody.lastName || !userBody.email || !userBody.password || !userBody.confirmPassword) {
        console.log("please fill all fields");
        return res.redirect('back');
    }

    if (req.body.password != req.body.confirmPassword) {
        return res.redirect('back');
    }

    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            try {
                const user = await User.create(req.body);
                console.log("user", user);
                return res.redirect('/users/sign-in');

            } catch (error) {
                console.log('error in creating user while signing up');
                console.log(error);
                return;
            }

        } else {
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
    return res.redirect('/');
}

//logout
module.exports.destroySession = function(req, res) {
    req.logout(function(err) {
        if (err) {
            console.log('Error:-' + err);
            return;
        }
        console.log("==================logout========================");
        //return res.redirect('/users/sign-in');
    });

    return res.redirect('/');
}
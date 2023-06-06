const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');


//Authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email',
        //set for ,if we want to pass first parameter of callback is res
        //purpose to use Noty ,otherwise no need to it
        passReqToCallback: true
    },

    //function(email, password, done) {
    async function(req, email, password, done) {
        //find the user and establish the identity

        try {
            const user = await User.findOne({ email: email });
            if (!user || user.password != password) {
                console.log('Invalid User Name And Password');
                //req.flash('error', 'Invalid User Name And Password')
                return done(null, false);
            }

            return done(null, user);
        } catch (error) {
            console.log('Error in finding user in passport');
            return done(error);
        }

    }

));



//serializing the user to decide  which key is to be kept in cookies
passport.serializeUser(function(user, done) {
    done(null, user.id);

});


//Deserialize the user from the key in the cookie
passport.deserializeUser(async function(id, done) {

    try {
        const user = await User.findById(id)
        return done(null, user);
    } catch (error) {
        console.log('Error in finding user ---> passport');
        return done(err);
    }
});


//check if the user is authenticate or not
passport.checkAuthentication = function(req, res, next) {
    //if the user is signed in ,then pass on the request to the next function
    if (req.isAuthenticated()) {
        return next();
    }

    //if the user is not signing  
    return res.redirect('/users/sign-in');
}


passport.setAuthenticatedUser = function(req, res, next) {

    if (req.isAuthenticated()) {
        //req.user contains the currents signed in user from the session cookie

        res.locals.user = req.user;
    }
    next();
};

module.exports.passport;





//-------------------cookie- using  passport-local-strategy----------------
//1. install passport...
//PS C:\Users\premn\Desktop\NODEWS\codeial> npm install passport

//2. install passport-local
//PS C:\Users\premn\Desktop\NODEWS\codeial> npm install passport-local

//3. create js  file in config folder name as..passport-local-strategy.js

//4........


//-----------------and create session  using express session api---------------
//instal session 
//PS C:\Users\premn\Desktop\NODEWS\codeial> npm install express-session 
//or
//PS C:\Users\premn\Desktop\NODEWS\codeial> npm install session
//or
//PS C:\Users\premn\Desktop\NODEWS\codeial> npm install express session


//-----------------------------------------------------------------------
//install  connect-mongo  for store cookie in mongodb
//PS C:\Users\premn\Desktop\NODEWS\codeial> npm install connect-mongo


//-------- uninstall and -change version and reinstall
//uninstall
//npm uninstall connect-mongo
//reinstall version
//npm i connect-mongo@3
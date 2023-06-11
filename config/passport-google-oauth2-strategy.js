const User = require('../models/user');
const passport = require('passport');
const crypto = require('crypto');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

//Google login Strategy
passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:8395/users/auth/google/callback",
        passReqToCallback: true
    },
    async function(request, accessToken, refreshToken, profile, done) {

        //console.log("profile=", profile);
        try {
            const user = await User.findOne({ email: profile.emails[0].value });
            if (user) {
                return done(null, user);
            } else {
                const newUser = await User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex'),
                });

                if (newUser) {
                    return done(null, user);
                }
            }

        } catch (error) {
            console.log('error in creating/finding user while google  signing up');
            console.log(error);
            return;
        }

    }
));

module.exports.passport;
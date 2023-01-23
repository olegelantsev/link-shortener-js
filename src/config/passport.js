const passport = require('passport');
const usersModel = require('../Models/users');

/*  Google AUTH  */

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
))


// session
passport.serializeUser((user, done) => { // attaches user profile to req.user
    done(null, user.id)
})
passport.deserializeUser((id, done) => {
    usersModel.findById(id, (err, user) => {
        if (err) { return done(err) }
        done(null, user)
    })
})


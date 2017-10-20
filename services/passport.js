const passport = require('passport');
const User = require('../models/users');
const keys = require('../config/keys');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const localOptions = {usernameField: 'email'};
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
    User.findOne({email}, (err, user) => {
        if(err){
            return done(err);
        }

        //if there's no error, but we coudn't find the user
        if(!user){
            return done(null, false);
        }

        user.comparePasswords(/*password that we got from the front end*/ password, (err, isMatch) =>{
            if(err) return done(err);
            //if there is NOT a match, return done with no error, but false
            if(!isMatch) return done(null, false);

            //if everything goes according to plan, no error AND send the user on forward
            return done(null, user);
        })
    });
});

const jwtOptions = {
    //look in the authorization key in the header of the client's request
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: keys.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    User.findById(payload.uid, (err, user) => {
        if(err) return done(err);

        if(user){
            return done(null, user);
        }
        return done(null, false);
    });
});

//we've already created a local and jwt strategy, now is when we tell passport to use them
passport.use(jwtLogin);
passport.use(localLogin);
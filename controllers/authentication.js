const jwt = require('jwt-simple');
const user = require('../models/users');
const keys = require('../config/keys');

function tokenForUser(user){
    const timestamp = new Date().getTime();

    //the first argument, encoded, is what we send to the front end. jwt.encode encrypts the first argument using the second argument as the key
    return jwt.encode({uid: user.id, iat:timestamp}, keys.secret);
}

exports.signup = (req, res, next) => {
    const {email, password, firstName, lastName, username, color} = req.body;

    if (!email || !password || !firstName || !lastName || !username || !color){
        const output = {
            errors: [],
            //if we give back errors, we can update our form with suggestions
            suggestions: {}
        };
        if (!email)
            output.errors.push('missing email');
        if (!password)
            output.errors.push('missing password');
        if (!firstName)
            output.errors.push('missing first name');
        if (!lastName)
            output.errors.push('missing last name');
        if (!username) {
            output.errors.push('missing username');
            output.suggestions.username = firstName && lastName ? firstName + ' ' + lastName: 'fluffybunny'
        }
        if (!color) {
            output.errors.push('missing color');
            output.suggestions.color = '#00ff00';
        }
        return res.status(422).send(output);
    }
    user.findOne({email},/*callback for after it looks in the database*/ (err, existingUser) => {
        if(err) return next(err);

        if(existingUser){
            return res.status(422).send({errors: ['Email already in use']})
        }
        //if there's NOT an existing user, we need to create a new one
        const newUser = new user({email, password, firstName, lastName, username, color});
        newUser.save(err => {
            if(err){
                return next(err);
            }

            //backend creates the token to send to the front end. additionally, we will send their username and color too
            const sendObj = {
                token: tokenForUser(newUser),
                username, color
            };

            //if there is no error, return a positive response
            res.json(sendObj);
        })
    });
};

exports.signin = (req, res, next) => {
    //we are sending this whole object to the front end
    res.send(
        {
            token:tokenForUser(req.user),
            username: req.user.username,
            color:req.user.color
        }
        );
};
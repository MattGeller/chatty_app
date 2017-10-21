const passportService = require('../services/passport');
const passport = require('passport');

//tell it to use the jwt strategy
exports.requireAuth = passport.authenticate('jwt', {session:false});
//tell it to use local strategy
exports.requireSignIn = passport.authenticate('local', {session:false});
const Authentication = require('../controllers/authentication');
const passportService = require('../services/passport');
const passport = require('passport');
//path is built in to node, one of its core things
const path = require('path');

//tell it to use the jwt strategy
const requireAuth = passport.authenticate('jwt', {session:false});
//tell it to use local strategy
const requireSignIn = passport.authenticate('local', {session:false});

//like export default
module.exports = app => {

    // app.get('/', (req, res) => {
    //     res.send('<h1>The app worked!</h1>')
    // });

    app.post('/auth/signin', requireSignIn, Authentication.signin);
    app.post('/auth/signup', Authentication.signup);
    //make routes for whatever we want (will be an axios call on the front end)
    app.get('/chat-lobby', requireAuth, (req, res) => {
        console.log('/chat-lobby', req.user);
        res.send({temp:'Say something'});
    })
};
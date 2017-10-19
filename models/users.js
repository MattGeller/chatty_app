const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
    email:{
        type: String,
        unique: true,
        lowercase: true,
    },
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    color: String
});

//.pre is what we do right before something happens (so in this case, right before we store a user)
userSchema.pre('save',(next) => {
    const user = this;
    bcrypt.genSalt(10, (err, salt) =>{
        if(err){
            return next(err)
        }
        //if there's no error
        //this is where we hash the password
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err){
                return next(err)
            }
            user.password = hash;
            //calling next, but with no error (because at this point, there shouldn't be an error)
            next();
        })
    });
});

//we are defining our own custom method on our user's schema (in this case, comparing their salted hashed password to the one we have
userSchema.methods.comparePasswords = (candidatePassword, callback) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if(err){
            return callback(err);
        }
        //first parameter is error. in this case, there is no error
        callback(null, isMatch);

    })
};

//actually create the model, now that it's ready to be used
const ModelClass = mongoose.model('user', userSchema);

//equivalent to webpack's export
module.exports = ModelClass;
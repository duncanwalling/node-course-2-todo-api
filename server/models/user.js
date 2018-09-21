const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 1,
        index: {
            unique: true
        },
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a value'
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 4
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }],
    archived: {
        type: Boolean,
        default: false,
        index: true
    }
});

UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};


UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();
    user.tokens.push({access, token});
 // user.tokens =  user.tokens.concat([{access, token}]);
    return user.save().then(()=> {
        return token;
    });
};

var User = mongoose.model('User', UserSchema);


// var newUser = new User({
//     firstName: 'Duncan',
//     lastName: 'Walling',
//     email: 'duncanwalling@gmail.com'
// });
//
// newUser.save().then((doc) => {
//     console.log('Saved user', doc);
// }, (e) => {
//     console.log('Unable to save user', e);
// });

module.exports = {User};
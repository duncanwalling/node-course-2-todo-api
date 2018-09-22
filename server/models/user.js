const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

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
    // should you clear the token here - this would prevent multiple tokens and logging in twice from different machines
    // or could just have a clean up here

    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();
    user.tokens.push({access, token});
    // user.tokens =  user.tokens.concat([{access, token}]);
    return user.save().then(() => {
        return token;
    });
};

UserSchema.methods.removeToken = function (token) {
  var user = this;

  return user.updateOne({
      $pull: {
          tokens: {token}
      }
  });
};

UserSchema.pre('save', function (next) {
    var user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

UserSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        return Promise.reject();
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

UserSchema.statics.findByCredentials = function (email, password) {
    var User = this;

    return User.findOne({email}).then((user)=> {
        if(!user) {
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if(res) resolve(user);
                else reject();
            });
        });
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
const mongoose = require('mongoose');
const validator = require('validator');


var User = mongoose.model('User', {
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
    }]
});

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
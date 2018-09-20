var mongoose = require('mongoose');

var User = mongoose.model('User', {
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength:1
    }
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
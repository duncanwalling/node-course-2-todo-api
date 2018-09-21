var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
    text : {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    },
    _creator: {
        type: mongoose.Schema.ObjectId,
        required: true
    }
});


// var newTodo = new Todo({
//     text: 'Digest dinner'
// });
//
// newTodo.save().then((doc) => {
//     console.log('Saved todo', doc);
// }, (e) => {
//     console.log('Unable to save todo', e);
// });

module.exports = {Todo};
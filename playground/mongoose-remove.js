const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

Todo.findByIdAndDelete('5ba3a76c26b3096246d65263').then((todo) => {
    console.log(todo);
});
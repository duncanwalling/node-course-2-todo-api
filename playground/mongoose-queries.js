const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//var id='5ba35d78cdbb8e5e2d03b4b411';

// if(!ObjectID.isValid(id)) {
//     console.log('ID not valid');
// }
// else
// {
//     // Todo.find({
// //     _id: id
// // }).then((todos)=> {
// //     console.log('Todos', todos);
// // });
// //
// // Todo.findOne({
// //     _id: id
// // }).then((todo)=> {
// //     console.log('Todo', todo);
// // });
//
//     Todo.findById(id).then((todo)=> {
//         if(!todo) {
//             return console.log('Id not found');
//         }
//         console.log('Todo by id', todo);
//     }).catch((e)=> console.log(e));
// }

var userId = '5ba281f26f196c5b830b9687';

User.findById(userId).then((user)=> {
        if(!user) {
            return console.log('Id not found');
        }
        console.log('User by id', user);
    }).catch((e)=> console.log(e));
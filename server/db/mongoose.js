var mongoose = require('mongoose');

// can use local db here if locally (i.e. for testing)
// var uri = process.env.MONGODB_URI || "local address";

var uri = "mongodb://fourteenfish:dU2wmp3nMnnkksz@cluster0-shard-00-00-zn00d.mongodb.net:27017,cluster0-shard-00-01-zn00d.mongodb.net:27017,cluster0-shard-00-02-zn00d.mongodb.net:27017/TodoApp?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";

mongoose.Promise = global.Promise;
mongoose.connect(uri, {useNewUrlParser: true});

module.exports = {mongoose};
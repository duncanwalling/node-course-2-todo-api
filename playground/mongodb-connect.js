const {MongoClient} = require('mongodb');

var uri = "mongodb://fourteenfish:dU2wmp3nMnnkksz@cluster0-shard-00-00-zn00d.mongodb.net:27017,cluster0-shard-00-01-zn00d.mongodb.net:27017,cluster0-shard-00-02-zn00d.mongodb.net:27017/TodoApp?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";
MongoClient.connect(uri, {useNewUrlParser: true }, function(err, client) {
    if(err) {
       return console.log('Unable to connect to MongoDB server', err);
    }
    console.log('Connected to MongoDB server');
    const collection = client.db("TodoApp").collection("Todos");
    // perform actions on the collection object
    collection.insertOne({
        text:'Walk the dog',
        completed: false
    }, (err, result) => {
        if(err) return console.log('Unable to insert todo', err);
    console.log(JSON.stringify(result.ops, undefined, 2));
    });

  //  const collection = client.db("TodoApp").collection("Users");
    // collection.insertOne({
    //     name:'Duncan Walling',
    //     age: 42,
    //     location: 'Nomansland'
    // }, (err, result) => {
    //     if(err) return console.log('Unable to insert todo', err);
    // console.log(JSON.stringify(result.ops, undefined, 2));
    // });



    client.close();
});


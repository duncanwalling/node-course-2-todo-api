var env = process.env.NODE_ENV || 'development';

if(env==='development' || env ==='test')
{
var config = require('./config.json');
 var envConfig = config[env];
 Object.keys(envConfig).forEach((key)=> {
     process.env[key] = envConfig[key];
 });
}
else
{
    // these are for production and would normally be on server etc.
    process.env.MONGODB_URI = 'mongodb://fourteenfish:dU2wmp3nMnnkksz@cluster0-shard-00-00-zn00d.mongodb.net:27017,cluster0-shard-00-01-zn00d.mongodb.net:27017,cluster0-shard-00-02-zn00d.mongodb.net:27017/TodoApp?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
   process.env.JWT_SECRET = "sdifusijewrkjskdfjsl345dkjfasdls3s6asdasd345";
}

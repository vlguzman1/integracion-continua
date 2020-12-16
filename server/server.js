'use strict';

process.env.NODE_ENV = 'development';
process.env.PORT = 8080;
process.env.HOST = '0.0.0.0';

const mongoose = require('mongoose');
const app = require('./app');

var uri = "mongodb://dbGabriel:4dtF786n#W@cluster0-shard-00-00.pykds.mongodb.net:27017,cluster0-shard-00-01.pykds.mongodb.net:27017,cluster0-shard-00-02.pykds.mongodb.net:27017/dbproject?ssl=true&replicaSet=atlas-ojlnxo-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.Promise = global.Promise;
mongoose
  .connect(uri, { useMongoClient: true })
  .then(() => {
    console.log('Coonections with MongoDB successful : Project');    
    app.listen(process.env.PORT, process.env.HOST, () => {
      console.log(`Server runing correctly in http://${process.env.HOST}:${process.env.PORT}`);
    })
  })
  .catch(err => console.log(err));

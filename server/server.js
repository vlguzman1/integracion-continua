'use strict';

process.env.NODE_ENV = 'development';
process.env.PORT = 8080;
process.env.HOST = '0.0.0.0';

const mongoose = require('mongoose');
const app = require('./app');

mongoose.Promise = global.Promise;
mongoose
  .connect('mongodb://localhost:27017/project', { useMongoClient: true })
  .then(() => {
    console.log('Coonections with MongoDB successful : Project');

    
    app.listen(process.env.PORT, process.env.HOST, () => {
      console.log(`Server runing correctly in http://${process.env.HOST}:${process.env.PORT}`);
    })
  })
  .catch(err => console.log(err));

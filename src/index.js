const app = require('./app');
const mongoose = require('mongoose');
const config = require('./configs/app');

mongoose.connect(config.mongoUri, config.mongoConnectOptions)
  .then(() => {
    console.log('MongoDB connecting: Successfully!');
    app.listen(config.PORT, () => console.log(`Server has been started on Port ${config.PORT}`));
  })
  .catch(err => console.log(err));
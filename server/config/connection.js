const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(
  'mongodb+srv://folx_db:3zACJz7VZFY9YwkK@paradise.6cqsvuv.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;

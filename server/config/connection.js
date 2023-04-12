const mongoose = require('mongoose');
require('dotenv').config();

const connectionString = process.env.MONGODB_URI || 'mongodb+srv://folx_db:3zACJz7VZFY9YwkK@paradise.6cqsvuv.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(
  connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;

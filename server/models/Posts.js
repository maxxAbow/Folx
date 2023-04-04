const mongoose = require('mongoose');
const { Schema } = mongoose;

const postsSchema = new Schema({
  userId: String,
  body: String,
  title: String,
  createdAt: Date,
});

const Posts = mongoose.model('Posts', postsSchema)
module.exports = { Posts }
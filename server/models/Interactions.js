const mongoose = require('mongoose');
const { Schema } = mongoose;

const interactionsSchema = new Schema({
  postId: String,
  comments: [{ body: String, createdAt: Date, userId: String }],
  likes: Number,
  dislikes: Number,
});

const Interactions = mongoose.model('Interactions', interactionsSchema)

module.exports = { Interactions }
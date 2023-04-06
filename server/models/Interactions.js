const mongoose = require('mongoose');
const { Schema } = mongoose;

const interactionsSchema = new Schema({
  postId: String,
  comments: [{ body: String, createdAt: Date, userId: String }],
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  },
});

const Interactions = mongoose.model('Interactions', interactionsSchema)

module.exports = { Interactions }
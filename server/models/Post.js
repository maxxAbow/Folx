const { Schema, model } = require('mongoose');
const postSchema = new Schema(
    {
      username: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: [140, 'Must be less than 140 characters, got {VALUE}']
      },
      userImage: {
        type: String,
        required: false
      },
      postImage: {
        type: String,
        required: false
      },
      likes: [
        {
        type: Schema.Types.ObjectId, 
        ref: 'user'
        }
      ],
      dislikes: [
        {
        type: Schema.Types.ObjectId, 
        ref: 'user'
        }
      ],
      createdAt: {
          type: Date,
          default: Date.now,
          get: function(timestamp) {
              return new Date(timestamp).toLocaleDateString()
        }
      }
    },
    {
        toJSON: {
          virtuals: true,
          getters: true,
        },
        id: false,
      }
);

postSchema
  .virtual('likeCount')
  .get(function() {
    return this.likes.length
})

postSchema
  .virtual('dislikeCount')
  .get(function() {
    return this.dislikes.length
})

const Post = model('post', postSchema);

module.exports = Post;
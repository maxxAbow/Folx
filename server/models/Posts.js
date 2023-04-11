const { Schema, model } = require('mongoose');
const postSchema = new Schema(
    {
      userId: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: [140, 'Must be less than 140 characters, got {VALUE}']
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
      comments: [
        { 
          body: String, 
          createdAt: Date, 
          userId: String 
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

const Posts = model('post', postSchema);

module.exports = {Posts};
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String, 
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address']
  },
  password: String,
  location: {
    type: String,
    required: true
  },
  favFood: {
    type: String,
    required: true
  },
  userImage: {
    type: String,
    required: false
  },
  followers: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Users',
    }
  ],
  following: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }
  ]
});

userSchema
  .virtual('friendCount')
  .get(function() {
      return this.friends.length
})

userSchema
  .virtual('likedCount')
  .get(function() {
    return this.likedPosts.length
})

userSchema
  .virtual('dislikedCount')
  .get(function() {
    return this.dislikedPosts.length
})

const Users = mongoose.model('Users', userSchema)

module.exports = { Users }
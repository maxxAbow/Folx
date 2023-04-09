const db = require('../config/connection');
const { Users, Posts, Interactions } = require('../models');
const mongoose = require("mongoose")
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt')

const usersData = require('./usersData.json');
const postsData = require('./postsData.json');

// const populatedUsers = usersData.map(async user => {
//   const populatedUser = {
//     ...user,
//     password: await bcrypt.hash('password123', 10)
//   }
//   return populatedUser
// })

db.once('open', async () => {
  // clean database
  // await Users.deleteMany({});
  // await Posts.deleteMany({});
  // await Interactions.deleteMany({});

  // const users = await Promise.all(populatedUsers)

  // const createdUsers = await Users.insertMany(users)

  const populatedPosts = postsData.map((post, i) => {
    return {
      ...post,
      // userId: createdUsers[i]._id,
      // createdAt: new Date(),
    }
  })

  const createdPosts = await Posts.insertMany(populatedPosts);

//   const populatedInteractions = []
//   for(let i = 0; i < 4; i++){
//     populatedInteractions.push(
//       {
//         postId: createdPosts[i]._id,
//         comments: [{
//           body: 'Hey I have some thoughts about this',
//           userId: createdUsers[i]._id
//         }]
//       }
//     )
//   }
  
//  const createdInteractions = await Interactions.insertMany(populatedInteractions);


  console.log('all done!');
  process.exit(0);
});

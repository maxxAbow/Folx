// //follow a user
// addSiouxChef,

// //unfollow a user
// fireSiouxChef,

// //display followed list
// getSiouxChefs,

const router = require('express').Router();
const { Users } = require('../../models');
const bcrypt = require('bcrypt')

router.get('/', async (req,res) => {
  try {
    const users = await Users.find();
    return res.json(users)
  } catch (e) {
    return res.status(500).json(e)
  }
})

router.get('/:id', async (req,res) => {
  try {
    const {id} = req.params
    if(!id){
      return res.status(400).json({message: 'ID must be defined'})
    }
    if(typeof id !== 'string'){
      return res.status(400).json({message: 'ID must be a string'})
    }
    const user = await Users.findById(id)
    if(!user){
      return res.status(404).json({message: 'User not found'})
    }
    console.log(user);
    return res.json(user)
  } catch (e) {
    return res.status(500).json(e)
  }
})

//TODO: Add new fields (location, fav_food)
router.post('/', async (req, res) => {
  try {
    const { username, email, password, location, favFood, userImage } = req.body

    if(!username || !email || !password || !location || !favFood || !userImage) {
      return res.status(400).json({message: "username, email, password, location, and favorite food must be defined"})
    }

    if(typeof username !== 'string' || typeof email !== 'string' || typeof password !== 'string' ||
      typeof location !== 'string' || typeof favFood !== 'string' || typeof userImage !== 'string') {
      return res.status(400).json({message: "username, email, password, location, and favorite food must be all strings"})
    }

    const user = {
      username,
      email,
      password: await bcrypt.hash(password, 10),
      location,
      favFood,
      userImage
    }

    const createdUser = await Users.create(user)
    return res.json(createdUser)
  } catch (e) {
    if(e?.keyPattern?.username){
      return res.status(400).json({message: 'Username must be unique'})
    }
    return res.status(500).json(e)
  }
})

router.delete('/:id', async (req,res) => {
  try {
    const {id} = req.params
    if(!id){
      return res.status(400).json({message: 'ID must be defined'})
    }
    if(typeof id !== 'string'){
      return res.status(400).json({message: 'ID must be a string'})
    }
    const response = await Users.deleteOne({_id: id})

    if(response.deletedCount){
      return res.json({message: 'User successfully deleted'})
    } else {
      return res.status(404).json({message: 'User not found'})
    }
    
  } catch (e) {
    return res.status(500).json(e)
  }
})

//TODO: Add new fields (location, fav_food)
router.put('/:id', async (req, res) => {
  try {
    const { username, firstName, lastName } = req.body
    const { id } = req.params

    if(!id){
      return res.status(400).json({message: 'ID must be defined'})
    }
    if(typeof id !== 'string'){
      return res.status(400).json({message: 'ID must be a string'})
    }
    if(!username || !firstName || !lastName ) {
      return res.status(400).json({message: "username, firstName, lastName must be defined"})
    }
    if(typeof username !== 'string' || typeof firstName !== 'string' ||
     typeof lastName !== 'string') {
      return res.status(400).json({message: "username, firstName, lastName must be strings"})
    }

    const response = await Users.updateOne({_id: id}, {username, firstName, lastName})

    if(response.matchedCount){
      return res.json({message: 'User successfully updated'})
    } else {
      return res.status(404).json({message: 'User not found'})
    }
  } catch (e) {
    if(e?.keyPattern?.username){
      return res.status(400).json({message: 'Username must be unique'})
    }
    return res.status(500).json(e)
  }
})

router.put('/password/:id', async (req, res) => {
  try {
    const { newPassword, oldPassword } = req.body
    const { id } = req.params

    if(!id){
      return res.status(400).json({message: 'ID must be defined'})
    }
    if(typeof id !== 'string'){
      return res.status(400).json({message: 'ID must be a string'})
    }
    if(!newPassword || !oldPassword ) {
      return res.status(400).json({message: "newPassword and oldPassword must be defined"})
    }
    if(typeof newPassword !== 'string' || typeof oldPassword !== 'string') {
      return res.status(400).json({message: "newPassword and oldPassword must be a string"})
    }

    const foundUser = await Users.findById(id)

    if(!foundUser){
      return res.status(404).json({message: 'User not found'})
    }

    const matchingPasswords = await bcrypt.compare(oldPassword, foundUser.password)

    if(matchingPasswords) {
      const hashedPassword = await bcrypt.hash(newPassword, 10)
      const response = await Users.updateOne({_id: id}, {password: hashedPassword})
      if(response.matchedCount){
        return res.json({message: 'User password successfully updated'})
      } else {
        return res.status(404).json({message: 'User not found'})
      }
    } else {
      res.status(400).json({message: 'oldPassword is incorrect'})
    }
  } catch (e) {
    return res.status(500).json(e)
  }
})

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body

    if(!username || !password ) {
      return res.status(400).json({message: "username and password must be defined"})
    }
    if(typeof username !== 'string' || typeof password !== 'string') {
      return res.status(400).json({message: "username and password must be a string"})
    }

    // Find the user who matches the posted e-mail address
    const foundUser = await Users.findOne({ username });

    if (!foundUser) {
      return res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
    }

    // Verify the posted password with the password store in the database
    const validPassword = await bcrypt.compare(password, foundUser.password);
   
    if (!validPassword) {
      return res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
    }

    // Create session variables based on the logged in user
    req.session.save(() => {
      req.session.userId = foundUser._id;
      req.session.loggedIn = true;
      
      return res.json({ user: foundUser, session: req.session, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    // Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.get('/session', (req, res) => {
  if (req.session) {
    res.json(req.session)
  } else {
    res.status(404).end();
  }
});

router.post('/followers/:userId', async (req, res) => {
  const { userId: loggedInUser } = req.session

  if (!loggedInUser) {
    return res.status(400).json({message: 'No user is present in the session'})
  }
  try {
    const user = await Users.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { followers: loggedInUser } }
    );
    const {_id} = user
    if(_id) {
      await Users.findByIdAndUpdate(
        loggedInUser,
        { $addToSet: { following: req.params.userId } }
      );
      return res.json({message: 'User successfully followed'})
    } else {
      return res.status(404).json({message: 'Error adding follower to user'})
    }
  } catch (error) {
    res.status(500).json({message: 'Error adding follower to user'})
  }
 
})

router.delete('/followers/:userId', async (req, res) => {
  const { userId: loggedInUser } = req.session

  if (!loggedInUser) {
    return res.status(400).json({message: 'No user is present in the session'})
  }
  try {
    const user = await Users.findByIdAndUpdate(
      req.params.userId,
      { $pull: { followers: loggedInUser } }
    );
    const {_id} = user
    if(_id) {
      await Users.findByIdAndUpdate(
        loggedInUser,
        { $pull: { following: req.params.userId } }
      );
      return res.json({message: 'User successfully unfollowed'})
    } else {
      return res.status(404).json({message: 'Error removing follower from user'})
    }
  } catch (error) {
    res.status(500).json({message: 'Error removing follower from user'})
  }
 
})

module.exports = router;

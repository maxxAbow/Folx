const router = require('express').Router();
const { Users } = require('../../models');
const bcrypt = require('bcrypt')

router.post('/login', async (req, res) => {
  try {
    const { userName, password } = req.body

    if(!userName || !password ) {
      return res.status(400).json({message: "userName and password must be defined"})
    }
    if(typeof userName !== 'string' || typeof password !== 'string') {
      return res.status(400).json({message: "userName and password must be a string"})
    }

    // Find the user who matches the posted e-mail address
    const foundUser = await Users.findOne({ userName });

    if (!foundUser) {
      return res
        .status(400)
        .json({ message: 'Incorrect userName or password, please try again' });
    }

    // Verify the posted password with the password store in the database
    const validPassword = await bcrypt.compare(password, foundUser.password);
   
    if (!validPassword) {
      return res
        .status(400)
        .json({ message: 'Incorrect userName or password, please try again' });
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

router.get('/', (req, res) => {
  if (req.session) {
    res.json(req.session)
  } else {
    res.status(404).end();
  }
});

module.exports = router;
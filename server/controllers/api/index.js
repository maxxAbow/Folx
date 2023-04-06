const router = require('express').Router();
const usersRoutes = require('./usersRoutes');
const sessionRoutes = require('./sessionRoutes')

router.use('/users', usersRoutes);
router.use('/session', sessionRoutes)


module.exports = router;
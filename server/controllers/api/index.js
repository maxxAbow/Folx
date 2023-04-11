const router = require('express').Router();
const usersRoutes = require('./usersRoutes');
const postRoutes = require('./postsRoutes')
const sessionRoutes = require('./sessionRoutes')

router.use('/users', usersRoutes);
router.use('/posts', postRoutes)
router.use('/session', sessionRoutes)


module.exports = router;
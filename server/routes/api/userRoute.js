const expressRouter = require('express').Router;

const {
    getSingleUser,
    getAllUsers,
    createUser,
    deleteUser,
    updateUser,
    addSiouxChef,
    fireSiouxChef,
    getSiouxChefs,
    hasLiked,
    hasDisliked,
} = require('../../controller/userController');

expressRouter.route('/')
    .get(getAllUsers)
    .post(createUser);

expressRouter.route('/:userId')
    .get(getSingleUser)
    .delete(deleteUser)
    .put(updateUser);

expressRouter.route('/:userId/SiouxChefs/:siouxChefId')
    .get(getSiouxChefs)
    .post(addSiouxChef)
    .delete(fireSiouxChef);

expressRouter.route('/:userId/posts/:postId')
    .get(hasDisliked)
    .get(hasLiked  )

module.export = expressRouter;
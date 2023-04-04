const expressRouter = require('express').Router;

const {
    createPost,
    getAllPosts,
    deletePost,
    createComment,
    getComments,
    editComment,
    getLikes,
    getDislikes,
    //optional
    getSinglePost,
} = require('../../controller/postController');

expressRouter.route('/')
    .get(getAllPosts)
    .get(getSinglePost);

expressRouter.route('/:postId')
    .post(createPost)
    .delete(deletePost)
    .get(getLikes)
    .get(getDislikes)

expressRouter.route('/:postId/comments/:commentId')
    .get(getComments)
    .post(createComment)
    .post(editComment)
    .delete(deleteComment);
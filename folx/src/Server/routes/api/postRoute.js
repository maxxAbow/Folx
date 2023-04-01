const expressRouter = require('express').Router;

const {
    createPost,
    getAllPosts,
    getSinglePost,
    deletePost,
    createComment,
    getComments,
    editComment,
} = require('../../controller/postController');

expressRouter.route('/')
    .get(getAllPosts)
    .get(getSinglePost);

expressRouter.route('/:postId')
    .post(createPost)
    .delete(deletePost)

expressRouter.route('/:postId/comments/:commentId')
    .get(getComments)
    .post(createComment)
    .post(editComment)
    .delete(deleteComment);
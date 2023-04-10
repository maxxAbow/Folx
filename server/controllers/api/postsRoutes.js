const router = require('express').Router();
const { Posts, Users } = require('../../models');

// GET all posts
router.get('/', async (req, res) => {
    try {
      const posts = await Posts.find();
      res.json(posts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
// GET a specific post by id
router.get('/:postId', async (req, res) => {
try {
    const {postId} = req.params;
    if(!postId){
    return res.status(400).json({message: 'PostID must be defined'})
    }
    if(typeof postId !== 'string'){
    return res.status(400).json({message: 'PostID must be a string'})
    }
    const post = await Posts.findById(postId)
    if(!post){
    return res.status(404).json({message: 'Post not found'})
    }
    return res.json(post)
} catch (error) {
    return res.status(500).json(error)
}
});

// CREATE a new post
router.post('/', async (req, res) => {  
try {
    const {
        username,
        description,
        userImage,
        postImage
    } = req.body

    if(!username || !description) {
        return res.status(400).json({message: "username and description must be defined"})
        }
    if(typeof username !== 'string' || typeof description !== 'string') {
        return res.status(400).json({message: "username and description must be strings"})
    }
    const newPost = {
        username,
        description,
        userImage,
        postImage
    }

    const createdPost = await Posts.create(newPost)
    const postId = createdPost._id

    const findUser = await Posts.findOne(
        {username},
        {$push: {posts: postId}},
        {new: true}
    );

    if(!findUser) {
        return res.status(400).json({message: "username not found"})
    }

    res.status(201).json(createdPost);
} catch (err) {
    res.status(400).json({ message: err.message });
}
});

// // Updates Like array with user's id that like the post, 
// router.put('/:postId/likes', async (req, res) => {
// try {
//     const post = await Post.findByIdAndUpdate(
//     req.params.postId,
//     { $addToSet: { likes: req.body.userId } },
//     { new: true }
//     );
//     res.json(post);
// } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
// }
// });

// //
// router.put('/:id/likes', async (req, res) => {
// const { id } = req.params;
// const { userId } = req.body;

// try {
//     const post = await Post.findById(id);

//     if (!post) {
//     return res.status(404).json({ message: 'Post not found' });
//     }

//     const index = post.likes.indexOf(userId);
//     if (index === -1) {
//     return res.status(400).json({ message: 'User has not liked this post' });
//     }

//     post.likes.splice(index, 1);
//     await post.save();

//     res.json(post);
// } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server Error' });
// }
// });

// Delete Post and remove the post from the user's posts array
router.delete('/:postId', async (req, res) => {
try {
    const {postId} = req.params;
    if(!postId){
        return res.status(400).json({message: 'PostID must be defined'})
    }
    if(typeof postId !== 'string'){
        return res.status(400).json({message: 'PostID must be a string'})
    }
    const foundPost = await Posts.findById(postId);
    if(!foundPost || foundPost._id) {
        return res.status(400).json({message: 'Post not found'})
    }
    const update = await Users.findOneAndUpdate(
        {username: foundPost.username},
        {$pull: {posts: postId}},
        {new: true}
    )
    const response = await Posts.deleteOne({_id: postId});
    if(response.deletedCount){
        return res.json({message: 'Post successfully deleted'})
    }
} catch (err) {
    res.status(500).json({ message: err.message });
}
});


module.exports = router;

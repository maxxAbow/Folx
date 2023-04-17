const router = require('express').Router();
const mongoose = require('mongoose');
const { Posts, Users } = require('../../models');

// GET all posts
router.get('/', async (req, res) => {
    try {
      const posts = await Posts.find().sort({createdAt: -1});
      res.json(posts);
    } catch (err) {
        console.log(err)
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
    console.log(error)
    return res.status(500).json(error)
}
});



//GET followings posts by user's list of following
router.get('/grabbing/:userId' , async (req,res)=>{
    const activeUser = req.session.userId;
    const user = Users.findOne({where:{userId:{activeUser}}});
    try{
        if(!activeUser){
            return res.status(400).json({message: 'userId must be defined'})
        }
        if(!user){
            return res.status(400).json({message: 'User not found'})
        }
        const following = user.following;
        if(!following){
            return res.status(400).json({message:'No followers found'})
        }
        const followingString = JSON.parse(following).map((string));
 //       const constructedUrl = '/grabbing/' + activeUser + '/' + followingString;
        const posts = await Posts.find({where: {userId: {$in: followingString}}});
        console.log(posts)
        if(!posts.length){
         return res.status(404).json({message: 'Posts not found'})
         }
         return res.json(posts)
    } catch (e) {
        console.log(e)
        return res.status(500).json(e)
        }
});
// const userIds = ['blah balh']
// const url = `http://localhost:3001/userId?userIds=${JSON.stringify(userIds)}`
// GET all posts by a userId
// router.get('/userId/all', async (req, res) => {
//     const {userIds: userIdsString} = req.query

//     try {
//         if(!userIdsString) {
//             return res.status(400).json({message: 'userIds must be defined'})
//         }
//         const userIds = JSON.parse(userIdsString).map((string) => new mongoose.Types.ObjectId(string))

//         const posts = await Posts.find({where: { userId: {$in: userIds }}})
//         console.log(posts)
//         if(!posts.length){
//         return res.status(404).json({message: 'Posts not found'})
//         }
//         return res.json(posts)
//     } catch (error) {
//         console.log(error)
//         return res.status(500).json(error)
//     }
// });




//GET posts by userId
// router.get('/profile/:userId', async (req,res)=>{
//     try{
//     const userId = req.body;
//     if(!userId){
//         return res.status(400).json({message: 'User not found'})
//     }
//     const posts = await Posts.find(userId);
//     if(!posts){
//         return res.status(404).json({message: 'Posts by user: '+ userId +' not found'})
//          }
//     } catch (e) {
//         console.log(e)
//         return res.status(500).json(e)
//         }
// });
router.get('/profile/:userId', async(req,res)=>{
    try{
    const {userId} = req.body;
    if(!userId){
        return res.status(400).json({message: 'User not found'})
    }
    const posts = await Posts.findById(userId);
    console.log(posts);
    if(!posts){
        return res.status(400).json({message: 'No posts found'})
    }
    res.json(posts);
    } catch (e){
        console.log(e);
        return res.status(500).json(e);
    }
});



//GET post data and only userImage
router.get('/join/:id', async (req,res)=>{
    const userId = req.params;
    if(!userId){
        return res.status(400).json({message: 'Post owner not found'})
    }
    const imageUser = await Users.findOne({where:{id:userId}});
    if(!imageUser){
        return res.status(400).json({message: 'Image not found'})
    }
    
})


// CREATE a new post
router.post('/', async (req, res) => {  
try {
    const {
        userId,
        username,
        description,
        location,
        postImage,
        userImage
    } = req.body

    if(!userId || !description) {
        return res.status(400).json({message: "userId and description must be defined"})
    }
    if(typeof description !== 'string') {
        return res.status(400).json({message: "userId and description must be strings"})
    }
    const newPost = {
        userId,
        username,
        description,
        location,
        postImage,
        userImage
    }

    const createdPost = await Posts.create(newPost)

    res.status(201).json(createdPost);
} catch (err) {
    res.status(400).json({ message: err.message });
}
});

// Updates Like array with user's id that like the post, 
router.put('/:postId/like', async (req, res) => {
    const { loggedInUser } = req.body

    if (!loggedInUser) {
        return res.status(400).json({message: 'No user is present in the session'})
    }
    try {
        const post = await Posts.findByIdAndUpdate(
            req.params.postId,
            { $addToSet: { likes: loggedInUser } },
            { new: true }
        );

        if (!post) {
            return res.status(400).json({message: 'Found no posts with this postId'})
        }

        res.json(post);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

//
router.put('/:postId/unlike', async (req, res) => {
    const { loggedInUser } = req.body

    if (!loggedInUser) {
        return res.status(400).json({message: 'No user is present in the session'})
    }

    try {
        const post = await Posts.findByIdAndUpdate(
            req.params.postId,
            { $pull: { likes: loggedInUser } },
            { new: true }
        );

        if (!post) {
            return res.status(400).json({message: 'Found no posts with this postId'})
        }
        res.json(post);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

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
    const response = await Posts.deleteOne({_id: postId});
    if(response.deletedCount){
        return res.json({message: 'Post successfully deleted'})
    } else {
        return res.status(404).json({message: 'Post not found'})
    }
} catch (err) {
    res.status(500).json({ message: err.message });
}
});

// Updates comments in the post
router.post('/:postId/comments', async (req, res) => {
    const {userId} = req.session
    const {body} = req.body
    if(!userId || !body){
        return res.status(400).json({message: 'userId and body must be defined'})
    }
    try {
        const post = await Posts.findByIdAndUpdate(
            req.params.postId,
            { $push: { comments: {
                userId,
                body,
                createdAt: new Date()
            } } },
            { new: true }
        );
        res.json(post);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});


module.exports = router;

const {Post, User, Interactions} = require('../models');

module.exports = {
    getPosts(req,res) {
        Post.find()
        .then((posts) => res.json(posts))
        .catch((err) => {
            console.log(err);
            res.status(500).json({message: 'Server'})
        })
    },

    getSinglePost(req,res) {
        const {postId} = req.params;
        Post.findOne({_id: postId})
            .then((post) => {
                !post
                    ? res.status(400).json({message: 'No user found with this ID'})
                    : res.status(200).json(post)
                })
            .catch((err) => {
                console.log(err);
                res.status(500).json({message: 'Server Error'})
            });
    },

    createPost(req,res) {
        const {description, username, userId} = req.body;
        if(!userId){
            res.status(400).json({message: 'Found no user with this ID'})
        }

        Post.create({description, username})
            .then((post) =>{
                const postId = post._id;
                
                return User.findByIdAndUpdate(
                userId,
                {$push: {posts: postId}},
                {new: true});
            })
            .then((user) => {
                !user
                    ? res.status(400).json({message: 'Found no user with this ID'})
                    : res.status(201).json(user)
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({message: 'Server Error'})
            })      
    },

    updatePost(req,res) {
        const {description} = req.body;
        const {postId} = req.params;
        Post.findByIdAndUpdate(
            postId,
            {description},
            {
                new: true,
                runValidators: true
            }
        )
        .then((post) => {
            !post
                ? res.status(400).json({message: 'Found no post with this ID'})
                : res.status(201).json(post)
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({message: 'Server Error'})
        })
    },

    deletePost(req,res) {
        const {postId} = req.params;
        Post.findById(postId)
        .then((post) => {  
            if (!post) {
                res.status(400).json({message: 'Found no post with this ID'})
            }          
            return Post.findByIdAndDelete(postId);
        })
        .then((post) => {
            const username = post.username;    
            return User.findOneAndUpdate(
                {username: username},
                {$pull: {posts: postId}},
                {new: true}
            )
        .then((user) => {
            !user
                ? res.status(400).json({message: 'Found no user with this ID'})
                : res.json({ message: 'post and associated user data deleted' });
        })
    })
        .catch((err) => {
            console.log(err);
            res.status(500).json({message: 'Server Error'})
        })
    },

    // likePost(req,res) {

    // },

    // removeLike(req,res) {

    // }
}

// module.exports = {

// //user creates a post
// createPost(req,res){
//     const {body, userId, title, createdAt} = req.body;
//     if(!userId){
//         res.status(400).json({message:'User account required to create post'})
//     }
//     Posts.create({body,createdAt})
//     .then((post)=>{
//         const postId=post._id;
//         return Users.findByIdAndUpdate(
//             userId,
//             {$push:{post:postId}},
//             {new:true});
//     })
//     .catch((err)=>{
//         console.log(err);
//         res.status(500).json({message:'Server error'})
//     })
// },

// //get all for feed
// getAllPosts(req,res){
//     Posts.find()
//     .then((posts)=> res.json(posts))
//     .catch((err)=>{
//         console.log(err);
//         res.status(500).json({message:'Server'})
//     })
// },

// //user deletes their own post
// deletePost,

// //user comments on a post
// createComment,

// //see post's comments on feed
// getComments,

// //edit user's comment
// editComment,

// //optional
// getSinglePost(req,res){
//     const{postId}=req.params;
//     Posts.findOne({_id: postId})
//     .then((posts)=>{
//         !posts
//         ? res.status(400).json({message: 'Post not found'})
//         : res.status(200).json(posts)
//     })
//     .catch((err)=>{
//         console.log(err);
//         res.status(500).json({message:'Server Error'})
//     });
// },

// }
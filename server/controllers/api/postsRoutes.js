const {Posts, Users, Interactions} = require('../models');

module.exports = {
//user creates a post
createPost(req,res){
    const {body, userId, title, createdAt} = req.body;
    if(!userId){
        res.status(400).json({message:'User account required to create post'})
    }
    Posts.create({body,createdAt})
    .then((post)=>{
        const postId=post._id;
        return Users.findByIdAndUpdate(
            userId,
            {$push:{post:postId}},
            {new:true});
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json({message:'Server error'})
    })
},

//get all for feed
getAllPosts(req,res){
    Posts.find()
    .then((posts)=> res.json(posts))
    .catch((err)=>{
        console.log(err);
        res.status(500).json({message:'Server'})
    })
},

//user deletes their own post
deletePost,

//user comments on a post
createComment,

//see post's comments on feed
getComments,

//edit user's comment
editComment,

//optional
getSinglePost(req,res){
    const{postId}=req.params;
    Posts.findOne({_id: postId})
    .then((posts)=>{
        !posts
        ? res.status(400).json({message: 'Post not found'})
        : res.status(200).json(posts)
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json({message:'Server Error'})
    });
},

}
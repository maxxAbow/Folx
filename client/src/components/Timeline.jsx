import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {setPosts} from "state";
import Post from './Post';
import api from 'utils/API';
import posts from 'posts';

function Timeline({userId, isProfile = false}) {
    // const dispatch = useDispatch();
    // const posts = useSelector((state) => state.posts);
    // const token = useSelector((state) => state.token);

    const [posts, setPosts] = useState([]);

    const getAllPosts = async () => {
        const allPosts = await api.getPosts();
        setPosts(allPosts);
    }
    
    const getUserPosts = async () => {
        const userPost = await api.getPostById();
    }

    // If User is on a profile, it will onl retrieve made by that specific user, otherwise will retreive posts from everyone
    useEffect(() => {
        if(isProfile) {
            // getUserPosts();
            return null
        } else {
            // getAllPosts();
            setPosts(posts);
        }
    }, [])

    return (
        <>
            {posts.map((post) => {
                <Post 
                    key={post._id}
                    postId={post._id}
                    userId={post.userId}
                    username={post.username}
                    description={post.description}
                    location={post.location}
                    userImage={post.userImage}
                    postImage={post.postImage}
                    likes={post.like}
                    dislikes={post.dislikes}
                />
            })}
        </>
    )
}

export default Timeline
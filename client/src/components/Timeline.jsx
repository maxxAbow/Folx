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
        } else {
            // getAllPosts();
        }
    }, [])

    return (
        <>
            {posts.map((post) => {
                <Post 
                    _id={}
                    userId={}
                    username={}
                    description={}
                    location={}
                    userImage={}
                    postImage={}
                    like={}
                    dislikes={}
                />
            })}
        </>
    )
}

export default Timeline
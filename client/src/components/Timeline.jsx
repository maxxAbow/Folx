import React, {useEffect, useState} from 'react'
import Post from './Post';
import api from 'utils/API';

function Timeline({userId, isProfile = false}) {
   
    const [posts, setPosts] = useState([]);

    const getAllPosts = async () => {
        const {data} = (await api.getPosts());
        console.log(data);
        setPosts(data);
    }
    
    const getUserPosts = async () => {
        const {data} = await api.getPostById();
    }

    // If User is on a profile, it will only retrieve post made by that specific user, otherwise will retreive posts from everyone
    useEffect(() => {
        if(isProfile) {
            // getUserPosts();
            return null
        } else {
            getAllPosts();
        }
    }, [isProfile])

    return (
        <>
        {posts.map(({
        _id,
        username,
        description,
        location,
        userImage,
        postImage,
        likes,
        createdAt
    }) => (
    <Post 
        key={_id}
        postId={_id}
        username={username}
        description={description}
        location={location}
        userImage={userImage}
        postImage={postImage}
        likes={likes}
        date={createdAt}
    />
    ))}

        </>
    );
}

export default Timeline
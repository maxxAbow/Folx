import React, {useEffect, useState} from 'react'
import Post from './Post';
import api from 'utils/API';

function Timeline({userId, posts, setPosts, updatePosts, postState, setPostState, user, isProfile = false, followers, setFollowers, following, setFollowing}) {
   
    const getAllPosts = async () => {
        const {data} = (await api.getPosts());
        setPosts(data);
    }
    
    const getUserPosts = async () => {
        const {data} = await api.getPostById();
    }

    // If User is on a profile, it will only retrieve post made by that specific user, otherwise will retreive posts from everyone
    useEffect(() => {
        if(isProfile) {
            return null
        } else {
            updatePosts();
        }
    }, [postState])

    if (!user) {
        return null
      }
    

    return (
        <>
        {posts.map(({
        _id,
        userId,
        username,
        description,
        location,
        userImage,
        postImage,
        likes,
        comments,
        createdAt
    }) => (
    <Post 
        key={_id}
        user={user}
        postId={_id}
        userId={userId}
        username={username}
        description={description}
        location={location}
        userImage={userImage}
        postImage={postImage}
        likes={likes}
        comments={comments}
        date={createdAt}
        followers={followers} 
        setFollowers={setFollowers}
        following={following}
        setFollowing={setFollowing}
        setPostState={setPostState}
    />
    ))}

        </>
    );
}

export default Timeline
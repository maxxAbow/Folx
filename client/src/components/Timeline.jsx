import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Post from './Post';
import api from 'utils/API';

function Timeline({
    posts, 
    setPosts,
    postState, 
    setPostState, 
    user,
    followers, 
    setFollowers, 
    following, 
    setFollowing,
    profileId, 
    setProfileId,
    isProfilePage}) {

    const {userId : id} = useParams()

    // Fetch request to GET all the posts from the API, then updates the posts state with the retrieved data.
    const getAllPosts = async () => {
        const retrievedPosts = await api.getPosts();
        setPosts(retrievedPosts.data);
    };

    // Fetch request to GET all the posts from a specific user by passing the userId as a paramater, then updates the posts state with the retrieved data.
    const getUserPosts = async (userId) => {
        const retrievedPosts = await api.getAllPostById(userId)
        setPosts(retrievedPosts.data);
    };

    // If User is on a profile, it will only retrieve all post made by that specific user, otherwise will retreive all posts from everyone
    // Also this useEffect helps update the timeline when a new posts is created, by watching the postState
    useEffect(() => {
        if(isProfilePage) {
            getUserPosts(id)
        } else {
            getAllPosts();
        }
    }, [postState, isProfilePage])

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
        profileId={profileId} 
        setProfileId={setProfileId}
        isProfilePage={isProfilePage}
    />
    ))}

        </>
    );
}

export default Timeline
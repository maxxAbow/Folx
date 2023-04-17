import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import Post from './Post';
import api from 'utils/API';

function Timeline({
    userId, 
    posts, 
    setPosts, 
    updatePosts, 
    postState, 
    setPostState, 
    user,
    // isProfile = false, 
    followers, 
    setFollowers, 
    following, 
    setFollowing,
    profileId, 
    setProfileId,
    isProfilePage}) {

    const {userId : id} = useParams()
    // If User is on a profile, it will only retrieve post made by that specific user, otherwise will retreive posts from everyone
    useEffect(() => {
        if(isProfilePage) {
            updatePosts(id)
        } else {
            updatePosts();
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
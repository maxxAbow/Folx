import React, {useEffect, useState} from 'react'
import Post from './Post';
import api from 'utils/API';

function Timeline({userId, posts, setPosts, updatePosts, postState, user, isProfile = false, followers, setFollowers, following, setFollowing}) {
   
    // const [posts, setPosts] = useState([]);

    const getAllPosts = async () => {
        const {data} = (await api.getPosts());
        setPosts(data);
        // if (typeof numLikes === 'string') {
        //     setNumLikes(numLikes.split(","))
        //   } else {
        //     setNumLikes(data.likes)
        //   }
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
        // numLikes={numLikes}
        // setNumLikes={setNumLikes}
        date={createdAt}
        followers={followers} 
        setFollowers={setFollowers}
        following={following}
        setFollowing={setFollowing}
    />
    ))}

        </>
    );
}

export default Timeline
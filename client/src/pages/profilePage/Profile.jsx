import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams} from 'react-router-dom';
import Navigation from 'components/Navigation';
import UserPanel from 'components/UserPanel';
import CreatePost from 'components/CreatePost';
import { Box, useMediaQuery } from '@mui/material';
import api from 'utils/API';
import Timeline from 'components/Timeline';

const Profile = ({isAuth, setIsAuth, user, setUser, profileId, setProfileId, isProfilePage, setIsProfilePage}) => {
  // Make fetch call here via the home component level, will do first thing tomorrow
  const [friend, setFriend] = useState(null) 
  // const [loggedInId, setLoggedInId] = useState(null)
  const [image, setImage] = useState('')
  const [location, setLocation] = useState('')
  const [followers, setFollowers] = useState(0)
  const [following, setFollowing] = useState(0)
  const [posts, setPosts] = useState([]);
  const [postState, setPostState ] = useState(false)
  const [loggedInUserDataLoaded, setLoggedInUserDataLoaded] = useState(false);

  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)")
  const navigate = useNavigate();
  const param = useLocation();
  let loggedInId = ''
  let friendData = {}
  let { userId } = useParams();

  const activeUserStorage = localStorage.getItem("activeUser");// Retrieves activerUsers data from local storage
  const activeUser = JSON.parse(activeUserStorage); // parses the string into a JS object

  if (!activeUser || activeUser[1] !== true) {
    navigate('/')
  } else if (activeUser[1] === true) {
    loggedInId = activeUser[0] // if logged in, setUserId
  }

  // change this to profileId
  const getUser = async (profileId) => {
    const friend = await api.getUserById(profileId);
    friendData = friend.data;
    setFriend(friendData)
    setImage(friendData.userImage)
   
  }
  
  const updatePosts = async (userId) => {
    const posts = await api.getAllPostById(userId)
    setPosts(posts.data);
    };

  useEffect( () => {
    getUser(userId)
    setProfileId(userId)
    setIsProfilePage(true)

  }, [param]);

  useEffect( () => {
    if ( friend?._id === loggedInId){
      setUser(friend)
      setLoggedInUserDataLoaded(true); 
    }
  }, [friend]);

  // if (!user) {
  //   return null
  // }
  
  return (
    <Box>
      <Navigation setIsAuth={setIsAuth} userId={loggedInId} isProfilePage={isProfilePage}/>
      <Box 
      width="100%" 
      padding="2rem 6%" 
      display={isNonMobileScreen ? "flex" : "block"}
      gap="0.5rem"
      justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
          <UserPanel user={friend} following={following} isProfilePage={isProfilePage}/>
        </Box>
        <Box 
          flexBasis={isNonMobileScreen ? "42%" : undefined}
          marginTop={isNonMobileScreen ? undefined : "2rem"}
        >
          {loggedInUserDataLoaded && <CreatePost user={user} setPostState={setPostState} />}
          <Timeline 
            user={friend} 
            posts={posts} 
            setPosts={setPosts} 
            setPostState={setPostState} 
            updatePosts={updatePosts} 
            postState={postState} 
            following={following} 
            setFollowing={setFollowing} 
            profileId={profileId} 
            setProfileId={setProfileId}
            isProfilePage={isProfilePage}
            />
        </Box>
        {isNonMobileScreen && (
          <Box flexBasis={"26%"}></Box>
        )}
      </Box>
    </Box>
  );
};

export default Profile;

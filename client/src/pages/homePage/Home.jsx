import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import Navigation from 'components/Navigation';
import UserPanel from 'components/UserPanel';
import CreatePost from 'components/CreatePost';
import { Box, useMediaQuery } from '@mui/material';
import Timeline from 'components/Timeline';
import api from 'utils/API';
import '../../assets/css/Home.css';

const Home = ({setIsAuth, user, setUser, profileId, setProfileId, setIsProfilePage}) => {

  const [image, setImage] = useState('')
  const [location, setLocation] = useState(useLocation())
  const [followers, setFollowers] = useState(0)
  const [following, setFollowing] = useState(0)

  const [posts, setPosts] = useState([]);
  const [postState, setPostState] = useState(false);

  const isNonMobileScreen = useMediaQuery('(min-width: 1000px)'); // set a boolean value to indicate whether the screen is greater than or equal to 1000px
  const navigate = useNavigate();
  let userId = '';
  let userData = {};

  const activeUserStorage = localStorage.getItem('activeUser'); // Retrieves activerUsers data from local storage
  const activeUser = JSON.parse(activeUserStorage); // parses the string into a JS object

  // If the active user is not logged in, navigate to the homepage
  if (!activeUser || activeUser[1] !== true) {
    navigate('/');

  // Otherwise, set the 'userId' variable to the id of the active user
  } else if (activeUser[1] === true) {
    userId = activeUser[0]; // if logged in, setUserId
  }

  // Get the user data for the given user id from the API and update the state with the retrieved data
  const getUser = async (userId) => {
    const findUser = await api.getUserById(userId);
    userData = findUser.data;
    setUser(userData);
    setImage(userData.userImage);
    setFollowers(userData.followers.length);
    // If the following state is of type string, it is split by the commas and set as an array to the 'following' state. 
    if (typeof following === 'string') {
      setFollowing(following.split(','));
    } else {
      // Otherwise, the following state is updated with the userData's following property which is an array.
      setFollowing(userData.following);
    }
  };

  useEffect(() => {
    getUser(userId) // Get the user data for the given user id on initial render and when the location changes
    setIsProfilePage(false); // Set the 'isProfilePage' state to false on initial render and when the location changes

  }, [location]);

  // If the user is not defined, return null
  if (!user) {
    return null;
  }  
  
  return (
    <Box className='lollipops'>
      <Navigation setIsAuth={setIsAuth} user={user} setUser={setUser} userId={userId} />
      <Box 
      width="100%" 
      padding="2rem 6%" 
      display={isNonMobileScreen ? "flex" : "block"}
      gap="0.5rem"
      justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreen ? '26%' : undefined}>
          <UserPanel user={user} following={following} />
        </Box>
        <Box
          flexBasis={isNonMobileScreen ? '42%' : undefined}
          marginTop={isNonMobileScreen ? undefined : '2rem'}
        >
          <CreatePost user={user} image={image} userId={userId} setPostState={setPostState} />
          <Timeline 
            user={user} 
            posts={posts} 
            setPosts={setPosts} 
            setPostState={setPostState} 
            postState={postState} 
            followers={followers} 
            setFollowers={setFollowers} 
            following={following} 
            setFollowing={setFollowing} 
            profileId={profileId} 
            setProfileId={setProfileId}
            />
          </Box>
        {isNonMobileScreen && (
          <Box flexBasis={"26%"}></Box>
        )}

      </Box>
    </Box>
  );
};

export default Home;

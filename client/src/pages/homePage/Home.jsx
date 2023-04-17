import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import Navigation from 'components/Navigation';
import UserPanel from 'components/UserPanel';
import CreatePost from 'components/CreatePost';
import { Box, useMediaQuery } from '@mui/material';
import api from 'utils/API';
import Timeline from 'components/Timeline';
import '../../assets/css/Home.css';

const Home = ({setIsAuth, user, setUser, profileId, setProfileId, setIsProfilePage}) => {
  // Make fetch call here via the home component level, will do first thing tomorrow
  // const [user, setUser] = useState(null) 
  // const [userId, setUserId] = useState(null)
  const [image, setImage] = useState('')
  const [location, setLocation] = useState(useLocation())
  const [followers, setFollowers] = useState(0)
  const [following, setFollowing] = useState(0)

  const [posts, setPosts] = useState([]);
  const [postState, setPostState] = useState(false);

  const isNonMobileScreen = useMediaQuery('(min-width: 1000px)');
  const navigate = useNavigate();
  let userId = '';
  let userData = {};

  const activeUserStorage = localStorage.getItem('activeUser'); // Retrieves activerUsers data from local storage
  const activeUser = JSON.parse(activeUserStorage); // parses the string into a JS object

  if (!activeUser || activeUser[1] !== true) {
    navigate('/');
  } else if (activeUser[1] === true) {
    userId = activeUser[0]; // if logged in, setUserId
  }

  const getUser = async (userId) => {
    const findUser = await api.getUserById(userId);
    userData = findUser.data;
    setUser(userData);
    setImage(userData.userImage);
    setFollowers(userData.followers.length);
    if (typeof following === 'string') {
      setFollowing(following.split(','));
    } else {
      setFollowing(userData.following);
    }
  };

  const updatePosts = async () => {
    const posts = await api.getPosts();
    setPosts(posts.data);
  };

  useEffect(() => {
    getUser(userId)
    setIsProfilePage(false);

  }, [location]);


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
            updatePosts={updatePosts} 
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

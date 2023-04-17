import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { PersonAddOutlined, PersonRemoveOutlined} from "@mui/icons-material";
import {Box, IconButton, Typography, useTheme} from "@mui/material";
import api from 'utils/API';
import FlexBetween from "./style-components/FlexBetween";
import ProfilePic from "./style-components/ProfilePic"; 

function Friend({
  image, 
  user, 
  friendId, 
  username, 
  location, 
  setFollowers, 
  following, 
  setFollowing,
  profileId, 
  setProfileId,
  isProfilePage}) {
  
  const [isFollowing, setIsFollowing] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userPost, setUserPost] = useState(false);
  const [params, setParams] = useState("")
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const route = useParams()

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  useEffect(() => {
    setParams(route);
    const activeUserStorage = localStorage.getItem("activeUser");// Retrieves activerUsers data from local storage
    const activeUser = JSON.parse(activeUserStorage); // parses the string into a JS object
    
    if (!activeUser || activeUser[1] !== true) {
      navigate('/');
    } else {
      setUserId({ loggedInUser: activeUser[0] });
    }
    for (let i = 0; i < user.following.length; i++) {
      
      if (friendId === user.following[i]){
        setIsFollowing(true);
      }
    }

    if (activeUser[0] === friendId) {
      setUserPost(true)
    }

  }, [pathname]);
  
  const follow = async (friendId, userId) => {
    await api.followUser(friendId, userId)
    setFollowing(typeof following === "number" ? following + 1 : following.length + 1);
    setIsFollowing(!isFollowing)
  };
  
  const unfollow = async (friendId) => {
    await api.unfollowUser(friendId, userId)
    setFollowing(typeof following === "number" ? following - 1 : following.length - 1);
    setIsFollowing(!isFollowing)
  };
       
    return (
      <FlexBetween>
      <FlexBetween gap="1rem">
        <ProfilePic image={image} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            setProfileId()
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {username}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {location}
          </Typography>
        </Box>
      </FlexBetween>
      {!isProfilePage && !userPost && (
        (isFollowing ? (
          <IconButton
            onClick={() => unfollow(friendId, userId)}
            sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
          >
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => follow(friendId, userId)}
            sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
          >
            <PersonAddOutlined sx={{ color: primaryDark }} />
          </IconButton>
          ))
        )}
      </FlexBetween>
    )
}

export default Friend
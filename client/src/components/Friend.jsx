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
  following, 
  setFollowing,
  setProfileId,
  isProfilePage}) {
  
  const [isFollowing, setIsFollowing] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userPost, setUserPost] = useState(false);
  const [params, setParams] = useState("")
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const route = useParams()

  // All theme colors
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
      setUserPost(true);
    }

  }, [pathname]);
  
  // Fetch request that updates the user's following array by adding the friendId to it
  const follow = async (friendId, userId) => {
    await api.followUser(friendId, userId);
    // updates the 'following' state so that the 'following' variable in the UserPanel component rerenders reflecting follow
    setFollowing(typeof following === "number" ? following + 1 : following.length + 1);
    // toggles state of 'isFollowing'
    setIsFollowing(!isFollowing);
  };
  
  // Fetch request that updates the user's following array by removing the friendId from it
  const unfollow = async (friendId) => {
    await api.unfollowUser(friendId, userId);
    // updates the 'following' state so that the 'following' variable in the UserPanel component rerenders reflecting the unfollow
    setFollowing(typeof following === "number" ? following - 1 : following.length - 1);
    // toggles state of 'isFollowing'
    setIsFollowing(!isFollowing);
  };
       
    return (
      <FlexBetween>
      <FlexBetween 
        gap="1rem"
        onClick={() => {
          navigate(`/profile/${friendId}`);
          setProfileId()
          navigate(0);
        }}
      >
        <ProfilePic image={image} size="55px" />
        <Box>
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
      {/* If not on a profile page and if post is not from the logged in user, then render these components */}
      {!isProfilePage && !userPost && (
        // if following
        (isFollowing ? (
          <IconButton
            onClick={() => unfollow(friendId, userId)}
            sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
          >
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          </IconButton>
        ) : (
        // if not following  
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
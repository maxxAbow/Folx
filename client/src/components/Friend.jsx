import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { PersonAddOutlined, PersonRemoveOutlined} from "@mui/icons-material";
import {Box, IconButton, Typography, useTheme} from "@mui/material";
import api from 'utils/API';
import FlexBetween from "./style-components/FlexBetween";
import ProfilePic from "./style-components/ProfilePic"; 

function Friend({image, friendId, username, location, setFollowers, setFollowing}) {
  
  const [isFollowing, setIsFollowing] = useState(false);
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  useEffect(() => {
    const activeUserStorage = localStorage.getItem("activeUser");// Retrieves activerUsers data from local storage
    const activeUser = JSON.parse(activeUserStorage); // parses the string into a JS object

    if (!activeUser || activeUser[1] !== true) {
      navigate('/');
    } else {
      setUserId({ loggedInUser: activeUser[0] });
    }
  }, []);


  
  const follow = async (friendId, userId) => {
    const followUser = await api.followUser(friendId, userId)
    setFollowing((prevState) => (prevState + 1));
    setIsFollowing(!isFollowing)
    console.log(`FriendId: ${friendId} is added`);
  };
  
  const unfollow = async (friendId) => {
    const unfollowUser = await api.unfollowUser(friendId, userId)
    setFollowing((prevState) => (prevState === 0 ? 0 : prevState - 1));
    setIsFollowing(!isFollowing)
    console.log(`FriendId: ${friendId} is removed`)
  };
       
    return (
        <FlexBetween>
        <FlexBetween gap="1rem">
          <ProfilePic image={image} size="55px" />
          <Box
            onClick={() => {
              navigate(`/profile/${friendId}`);
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
        {isFollowing ? (
        <IconButton
            onClick={() => unfollow(friendId, userId)}
            sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
        </IconButton>
        ): (
        <IconButton
            onClick={() => follow(friendId, userId)}
            sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
            <PersonAddOutlined sx={{ color: primaryDark }} />
        </IconButton>
        )}
      </FlexBetween>
  )
}

export default Friend
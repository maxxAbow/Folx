import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { PersonAddOutlined, PersonRemoveOutlined} from "@mui/icons-material";
import {Box, IconButton, Typography, useTheme} from "@mui/material";
import api from 'utils/API';
import FlexBetween from "./style-components/FlexBetween";
import ProfilePic from "./style-components/ProfilePic"; 

function Friend({image, friendId, username, location}) {
  
  const [following, setFollowing] = useState(false);

  const navigate = useNavigate();

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  let userId = {}

  const activeUserStorage = localStorage.getItem("activeUser");// Retrieves activerUsers data from local storage
  const activeUser = JSON.parse(activeUserStorage); // parses the string into a JS object
  
  if (!activeUser || activeUser[1] !== true) {
    navigate('/')
  } else if (activeUser[1] === true) {
    userId = {
      loggedInUser: activeUser[0]
    } // if logged in, setUserId
    // console.log(userId)
  }


  
  const follow = async (friendId, userId) => {
    const followUser = await api.followUser(friendId, userId)
    setFollowing(!following)
    console.log(`FriendId: ${friendId} is added`);
    console.log(userId)
  };
  
  const unfollow = async (friendId) => {
    const unfollowUser = await api.unfollowUser(friendId, userId)
    setFollowing(!following)
    console.log(`FriendId: ${friendId} is removed`)
    console.log(userId)

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
        {following ? (
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
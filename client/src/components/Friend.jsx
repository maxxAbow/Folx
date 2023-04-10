import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { PersonAddOutlined, PersonRemoveOutlined} from "@mui/icons-material";
import {Box, IconButton, Typography, useTheme} from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { setFriends } from "state";

import FlexBetween from "./style-components/FlexBetween";
import ProfilePic from "./style-components/ProfilePic"; 

function Friend({image, friendId, username, subtitle}) {
  
  const [isFriend, setIsFriend] = useState(false);

  const navigate = useNavigate();

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  
  const addFriend = () => {
      setIsFriend(!isFriend)
      console.log("Friend is added");
  };
  
  const removeFriend = () => {
      setIsFriend(!isFriend)
      console.log("Friend is removed")
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
              {subtitle}
            </Typography>
          </Box>
        </FlexBetween>
        {isFriend ? (
        <IconButton
            onClick={() => removeFriend()}
            sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
        </IconButton>
        ): (
        <IconButton
            onClick={() => addFriend()}
            sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
            <PersonAddOutlined sx={{ color: primaryDark }} />
        </IconButton>
        )}
      </FlexBetween>
  )
}

export default Friend
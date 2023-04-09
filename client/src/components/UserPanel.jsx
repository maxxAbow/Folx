import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    DinnerDiningOutlined,
    LocalPizzaOutlined,
    DeleteOutlined,
    NoMealsOutlined
} from "@mui/icons-material";

import {Box, Typography, Divider, useTheme } from "@mui/material";
import ProfilePic from './style-components/ProfilePic';
import FlexBetween from './style-components/FlexBetween';
import WidgeWrap from './style-components/WidgeWrap';
import { useSelector } from 'react-redux';
import api from 'utils/API';

function UserPanel({userId, image}) {
    const [user, setUser] = useState(null);
    const {palette} = useTheme();
    const navigate = useNavigate()
    const token = useSelector((state) => state.token);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;


    const searchUser = async (userId) => {
      const response = await api.getUserById(userId);
      const userInfo = await setUser(response.data);
    }
    
    useEffect(() => {
      searchUser(userId);
    }, [])

    // useEffect(() => {
    //   console.log(user);
    // }, [user]);
    
    if (!user) {
      return null
    }

    const {
      username,
      friends,
      location,
      favFood,
      likedPosts
    } = user;

  return (
    <WidgeWrap>
      <FlexBetween
        gap="0.5rem"
        paddingBottom="1.1rem"
        onClick={() => navigate(`/profile/:${userId}`)}
      >
        {/* First Row */}
        <FlexBetween gap="1rem">
          {/* Need to import image soon, work with Backend for this as well */}
          <Box>
            <ProfilePic 
              image={image} 
            />
          </Box>
          <Box>
            <Typography 
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer"
                }
              }}>
                {username}
            </Typography>
              {/* Need to work with Back-end to add number of friends to User Model */}
              <Typography color={medium}>{friends.length} Friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

        <Divider />

        {/* Next Row */}
          <Box padding="1rem 0">
              <Box display="flex" alignItems="center" gap="1rem" marginBottom="0.5rem">
                <LocationOnOutlined  fontSize='large' sx={{color:main}}/>
                <Typography color={dark} fontWeight="500">{location}</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap="1rem">
                <DinnerDiningOutlined  fontSize='large' sx={{color:main}}/>
                {/* Might change this to favorite cuisine instead, talk to back-end */}
                <Typography color={dark} fontWeight="500">Favorite Food: </Typography>
                <Typography color={dark} >{favFood} </Typography>
              </Box>
          </Box>
          <Divider />

          {/* New Row */}
          <Box padding="1rem 0">
            <Box display="flex" alignItems="center" gap="1rem" marginBottom="0.5rem">
              <LocalPizzaOutlined fontSize='large' sx={{color:main}}/>
              <Typography color={dark} fontWeight="500">Number of Likes: </Typography>
              {/* Replace with variable with number of likes */}
              <Typography color={dark}> {likedPosts.length}</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap="1rem" marginBottom="0.5rem">
              <NoMealsOutlined fontSize='large' sx={{color:main}}/>
              <Typography color={dark} fontWeight="500">Number of Dislikes: </Typography>
              {/* Replace with variable with number of likes */}
              <Typography color={dark}> 0 </Typography>
            </Box>
          </Box>

          {/* Future Dev, add new rows for social profiles */}
    </WidgeWrap>
  )
}

export default UserPanel
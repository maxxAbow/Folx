import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import {
    ManageAccountsOutlined,
    LocationOnOutlined,
    DinnerDiningOutlined,
    RemoveRedEyeOutlined,
    DeliveryDiningOutlined
} from "@mui/icons-material";

import {Box, Typography, Divider, useTheme, useMediaQuery } from "@mui/material";
import ProfilePic from './style-components/ProfilePic';
import FlexBetween from './style-components/FlexBetween';
import WidgeWrap from './style-components/WidgeWrap';
import api from 'utils/API';

function UserPanel({user, following, isProfilePage}) {

    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)")
    const {palette} = useTheme();
    const navigate = useNavigate()
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;
    
    const activeUserStorage = localStorage.getItem("activeUser");// Retrieves activerUsers data from local storage
    const activeUser = JSON.parse(activeUserStorage); // parses the string into a JS object
    let isUserProfile = false;
    let loggedInId = "";

    if (!activeUser || activeUser[1] !== true) {
      navigate('/')
    } else if (activeUser[1] === true) {
      loggedInId = activeUser[0];
    }

    if (!user) {
      return null
    }

    const {
      _id,
      username,
      location,
      favFood,
      userImage,
      followers,
    } = user;

    if (loggedInId === _id) {
      isUserProfile = true;
    }

  return (
    <>
    {isNonMobileScreen ? (
      <WidgeWrap sx={{ position: "fixed", width: "23.5%" }}>
      <FlexBetween
        gap="0.5rem"
        paddingBottom="1.1rem"
      >
        {/* First Row */}
        <FlexBetween gap="1rem" onClick={() => navigate(`/profile/${_id}`)}>
          <Box>
            <ProfilePic 
              image={userImage} 
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
              <Typography color={medium}>{followers.length} Followers</Typography>
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
                <Typography color={dark} fontWeight="500">Favorite Food: </Typography>
                <Typography color={dark} >{favFood} </Typography>
              </Box>
          </Box>

          <Divider />

          {/* New Row */}
          {/* If 'isProfilePage' is false (meaning on homepage) render these components below */}
          {!isProfilePage &&(
          <Box padding="1rem 0">
              <Box display="flex" alignItems="center" gap="1rem" marginBottom="0.5rem">
                <DeliveryDiningOutlined fontSize='large' sx={{color:main}}/>
                <Typography color={dark} fontWeight="500">Followers: </Typography>
                <Typography color={dark}> {followers.length}</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap="1rem" marginBottom="0.5rem">
                <RemoveRedEyeOutlined fontSize='large' sx={{color:main}}/>
                <Typography color={dark} fontWeight="500">Following: </Typography>
                {/* Replace with variable with number of likes */}
                <Typography color={dark}> {typeof following === "number" ? following : following.length} </Typography>
              </Box>
           </Box>
          )}

          {/* If user is on their profile page, render these components below */}
          {isProfilePage && isUserProfile &&(
          <Box padding="1rem 0">
              <Box display="flex" alignItems="center" gap="1rem" marginBottom="0.5rem">
                <DeliveryDiningOutlined fontSize='large' sx={{color:main}}/>
                <Typography color={dark} fontWeight="500">Followers: </Typography>
                <Typography color={dark}> {followers.length}</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap="1rem" marginBottom="0.5rem">
                <RemoveRedEyeOutlined fontSize='large' sx={{color:main}}/>
                <Typography color={dark} fontWeight="500">Following: </Typography>
                {/* Replace with variable with number of likes */}
                <Typography color={dark}> {user.following.length} </Typography>
              </Box>
           </Box>
          )}
          {/* Future Dev, add new rows for social profiles */}
    </WidgeWrap>
    ) : (
      // Renders Mobile view of app
      <WidgeWrap>
      <FlexBetween
        gap="0.5rem"
        paddingBottom="1.1rem"
        onClick={() => navigate(`/profile/${_id}`)}
      >
        {/* First Row */}
        <FlexBetween gap="1rem">
          <Box>
            <ProfilePic 
              image={userImage} 
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
              <Typography color={medium}>{followers.length} Followers</Typography>
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
                <Typography color={dark} fontWeight="500">Favorite Food: </Typography>
                <Typography color={dark} >{favFood} </Typography>
              </Box>
          </Box>
          <Divider />

          {/* New Row */}
          
          {!isProfilePage && (
          <Box padding="1rem 0">
              <Box display="flex" alignItems="center" gap="1rem" marginBottom="0.5rem">
                <DeliveryDiningOutlined fontSize='large' sx={{color:main}}/>
                <Typography color={dark} fontWeight="500">Followers: </Typography>
                <Typography color={dark}> {followers.length}</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap="1rem" marginBottom="0.5rem">
                <RemoveRedEyeOutlined fontSize='large' sx={{color:main}}/>
                <Typography color={dark} fontWeight="500">Following: </Typography>
                {/* Replace with variable with number of likes */}
                <Typography color={dark}> {typeof following === "number" ? following : following.length} </Typography>
              </Box>
           </Box>
          )}

          {isProfilePage && isUserProfile && (
            <Box padding="1rem 0">
             <Box display="flex" alignItems="center" gap="1rem" marginBottom="0.5rem">
               <LocationOnOutlined  fontSize='large' sx={{color:main}}/>
               <Typography color={dark} fontWeight="500">{location}</Typography>
             </Box>
             <Box display="flex" alignItems="center" gap="1rem">
               <DinnerDiningOutlined  fontSize='large' sx={{color:main}}/>
               <Typography color={dark} fontWeight="500">Favorite Food: </Typography>
               <Typography color={dark} >{favFood} </Typography>
             </Box>
            </Box>
          )}
      
          {/* Future Dev, add new rows for social profiles */}
    </WidgeWrap>
    )}
    </>
  )
}

export default UserPanel
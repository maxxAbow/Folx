import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import {
    ManageAccountPutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined
} from "@mui/icons-material";

import {Box, Typography, Divider, useTheme } from "@mui/material";
import ProfilePic from './ProfilePic';
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
      searchUser(`643059c59d990055ea7bb745`);
    }, [])

    // useEffect(() => {
    //   console.log(user);
    // }, [user]);
    
    if (!user) {
      return null
    }

    const { userName, firstName, lastName } = user
    console.log(userName + ',' + firstName + ',' + lastName)
  
  return (
    <WidgeWrap>
      <FlexBetween
        gap="0.5rem"
        paddingBottom="1.1rem"
        // onClick={() => navigate(`/profile/:${userId}`)}
      >
        <FlexBetween gap="1rem">
          {/* Need to import image soon */}
          <ProfilePic image={image} />
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
                {firstName} {lastName}
              </Typography>
          </Box>
        </FlexBetween>
      </FlexBetween>
    </WidgeWrap>
  )
}

export default UserPanel
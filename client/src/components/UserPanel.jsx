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
      searchUser(`642e0df19e30862e22e41145`);
      console.log(user)
    }, [])

    // useEffect(() => {
    //   console.log(user);
    // }, [user]);
    
  return (
    <div>UserPanel</div>
  )
}

export default UserPanel
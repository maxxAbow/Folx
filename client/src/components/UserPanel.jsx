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
import WidgeWrap from './style-components/widgeWrap';
import { useSelector } from 'react-redux';

function UserPanel() {
  return (
    <div>UserPanel</div>
  )
}

export default UserPanel
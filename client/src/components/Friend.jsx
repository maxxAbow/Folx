import React from 'react'
import { PersonAddOutlined, PersonRemoveOutlined} from "@mui/icons-material";
import {Box, IconButton, Typography, useTheme} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state";

import FlexBetween from "./style-components/FlexBetween";
import ProfilePic from "./style-components/ProfilePic"; 


function Friend({image, friendId, username, subtitle}) {
  return (
    <div>Friend</div>
  )
}

export default Friend
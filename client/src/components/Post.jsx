import React, {useState, useEffect} from 'react';
import {
  LocalPizzaOutlined, 
  NoMealsOutlined, 
  LocationOnOutlined,
  CommentOutlined,
  ShareOutlined
} from "@mui/icons-material"
import {Box, Divider, IconButton, Typography, useTheme} from "@mui/material";
import ProfilePic from './style-components/ProfilePic';
import FlexBetween from './style-components/FlexBetween';
import WidgeWrap from './style-components/WidgeWrap';
import Friend from './Friend';


const Post = (props) => {
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const likes = props.likes.length

  const [liked, setliked] = useState(false);

  // useEffect(()=> {
    
  // }, [liked]);

  return (
    <WidgeWrap margin="2rem 0">
      <Friend 
      username={props.username}
      subtitle={props.location}
      image={props.userImage}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {props.description}
      </Typography>
      {props.postImage && (
        <img
        width="100%"
        height="auto"
        alt="post"
        style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
        src={`../assets/images/post-images/${props.postImage}.jpg`}
      />
      )}
      <FlexBetween marginTop="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setliked(!liked)}>
            {liked ? (
                <LocalPizzaOutlined sx={{ color: primary }} />
              ) : (
                <LocalPizzaOutlined />
            )}
            </IconButton>
            <Typography>{likes}</Typography>
          </FlexBetween>
          <FlexBetween gap="0.3rem">
            <IconButton>
              <CommentOutlined />
            </IconButton>
            {/* <Typography></Typography> */}
          </FlexBetween>
            <IconButton>
              <ShareOutlined />
          </IconButton>
        </FlexBetween>
      </FlexBetween>
    </WidgeWrap>
  )
};

export default Post;

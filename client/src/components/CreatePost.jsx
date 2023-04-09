import React, {useState, useEffect} from 'react';
import api from 'utils/API';

import {
    AttachFileOutlined,
    ImageOutlined,
    MicOutlined,
    EditOutlined,
    GifBoxOutlined,
    MoreHorizOutlined,
    DeleteOutlined
} from '@mui/icons-material';

import { 
    Box, 
    Divider, 
    Typography, 
    InputBase, 
    useTheme, 
    Button, 
    IconButton, 
    useMediaQuery 
} from '@mui/material';

import Dropzone from 'react-dropzone';
import FlexBetween from './style-components/FlexBetween';
import ProfilePic from './style-components/ProfilePic';
import { useDispatch, useSelector } from 'react-redux';
import {setPosts} from "state";
import WidgeWrap from './style-components/WidgeWrap';

function CreatePost({image}) {
    const dispatch = useDispatch();
    // State to represent if the user clicks the 'image button' to open up a place to drop an image
    const [isImage, setIsImage] = useState(false);
    // State to store the actuall image if the decide to dropit/upload it
    const [uploadImage, isUploadImage] = useState(null)
    // State to represent post content
    const [post, setPost] = useState("");

    const {palette} = useTheme();
    // const {_id} = useSelector((state) => state.user);
    // const token = useSelector((state) => state.token);
    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium; 

    const createPost = async (data) => {
        const newPost = await api.createPost(data);
    };

  return (
    <WidgeWrap>
       <FlexBetween gap="1.5rem">
        <ProfilePic image={image} />
        <InputBase
            placeholder='Tell us about your meal?'
            value={post}
            onChange={(e) => setPost(e.target.value)}
            sx={{
               width: "100%",
               backgroundColor: palette.neutral.light ,
               borderRadius: "2rem",
               padding: "1rem 2rem"
            }}
        />
        </FlexBetween> 
       {isImage &&(
       <Box
        borderRadius="5px"
        border={`1px solid ${medium}`}
        padding="1 rem"
       >
            <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => isUploadImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => isUploadImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
       </Box>
       )}

       <Divider sx={{margin: "1.25rem 0"}}/>
    </WidgeWrap>
  )
}

export default CreatePost
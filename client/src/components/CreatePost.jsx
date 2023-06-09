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
import WidgeWrap from './style-components/WidgeWrap';

function CreatePost({user, image, setPostState}) {
    // State to represent if the user clicks the 'image button' to open up a place to drop an image
    const [isImage, setIsImage] = useState(false);
    // State to represent post content
    const [description, setDescription] = useState("");
    // State to store the actuall image if the decide to dropit/upload it
    const [uploadImage, setUploadImage] = useState(null)

    const {palette} = useTheme();

    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium; 

    const newPost = async () => {
       await api.createPost({
            userId: user._id,
            username: user.username,
            description,
            location: user.location,
            userImage: user.userImage
        })

        setDescription("");
        setUploadImage(null);
        setIsImage(false);
        setPostState((prevState) => (!prevState))
    };

  return (
    <WidgeWrap>
       <FlexBetween gap="1.5rem">
        <ProfilePic image={user.userImage} />
        <InputBase
            placeholder='Tell us about your meal?'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
        border={`1px solid ${medium}`}
        borderRadius="5px"
        marginTop="1rem"
        padding="1rem"
       >
            <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setUploadImage(acceptedFiles[0])}
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
                    {!uploadImage ? (
                    <p>Add Image Here</p>
                    ) : (
                    <FlexBetween>
                        <Typography>{uploadImage.name}</Typography>
                        <EditOutlined />
                    </FlexBetween>
                    )}
                </Box>
                {uploadImage && (
                    <IconButton
                    onClick={() => setUploadImage(null)}
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
       {/* Stores all icons below */}
       <FlexBetween>
            {/* This will turn off/on the DropZone area to upload an image  */}
            <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
                <ImageOutlined sx={{color: mediumMain}}/>
                <Typography
                    color={mediumMain}
                    sx={{
                        "&:hover": {cursor: "pointer", color: medium}
                    }}
                >
                    Image
                </Typography>
            </FlexBetween>
            {isNonMobileScreen ? (
                <>
                    <FlexBetween gap="0.25rem">
                        <GifBoxOutlined sx={{color: mediumMain}}/>
                        <Typography color={mediumMain}>Clip</Typography>
                    </FlexBetween>
                    <FlexBetween gap="0.25rem">
                        <AttachFileOutlined sx={{color: mediumMain}}/>
                        <Typography color={mediumMain}>Attachment</Typography>
                    </FlexBetween>
                    <FlexBetween gap="0.25rem">
                        <MicOutlined sx={{color: mediumMain}}/>
                        <Typography color={mediumMain}>Audio</Typography>
                    </FlexBetween>
                </>
            ): <FlexBetween gap="0.25rem">
                    <MoreHorizOutlined sx={{color: mediumMain}}/>
                </FlexBetween>
            }

           <Button 
           //If user has not updated post's state, the button is disabled
            disabled={!description} 
            onClick={()=> newPost()}
            sx={{
                color: "#FFFFFF",
                backgroundColor: palette.primary.main,
                borderRadius: "3rem"
            }}
            >
            Post
            </Button> 
       </FlexBetween>

    </WidgeWrap>
  )
}

export default CreatePost
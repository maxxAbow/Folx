import { Box } from "@mui/material";

// Component for the user's profile image widget
//Make onlick fucntion
const ProfilePic = ({image, size="60px"}) => {
    return (
        <Box width={size} height={size}>
            <img 
                style={{objectFit: "cover", borderRadius: "50%", cursor: "pointer"}}
                width={size}
                height={size}
                alt="user"
                // Below is path for to receive image from the cloud
                // src={`http://localhost:3001/assets/${image}`}
                src={`../assets/images/${image}.jpg`}
            />
        </Box>
    )
}

export default ProfilePic;
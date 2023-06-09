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
                // Below is path for to receive image public folder
                src={`../assets/images/profile-pics/${image}.jpg`}
            />
        </Box>
    )
}

export default ProfilePic;
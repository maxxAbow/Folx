import { Box } from "@mui/material";

// Component for the user's profile image widget
const ProfilePic = ({image, size="60px"}) => {
    return (
        <Box width={size} height={size}>
            <img 
                style={{objectFit: "cover", borderRadius: "50%"}}
                width={size}
                height={size}
                alt="user"
                src={`http://localhost:2001/assets/${image}`}
            />
        </Box>
    )
}

export default ProfilePic;
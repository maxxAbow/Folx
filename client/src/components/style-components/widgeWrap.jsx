// style-components are being used to re-use CSS styling properties as components inm different areas of our app
import {Box} from '@mui/material';
import {styled} from '@mui/system';

const WidgeWrap = styled(Box)(({theme}) => ({
    padding: "1.5rem 0.75rem 1.5rem",
    backgroundColor: theme.palette.background.alt,
    borderRadius: "0.75rem"
}));

export default WidgeWrap;
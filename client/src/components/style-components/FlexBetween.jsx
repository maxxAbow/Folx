// style-components are being used to re-use CSS styling properties as components inm different areas of our app
import {Box} from '@mui/material';
import {styled} from '@mui/system';

const FlexBetween = styled(Box) ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
})

export default FlexBetween;
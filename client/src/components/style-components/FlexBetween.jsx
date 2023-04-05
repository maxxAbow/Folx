// style-components are being used to re-use CSS styling as components
import {Box} from '@mui/material';
import {styled} from '@mui/system';

function FlexBetween = styled(Box) ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
})

export default FlexBetween;
import React, { useEffect, useState } from 'react';
import Navigation from 'components/Navigation';
import UserPanel from 'components/UserPanel';
import CreatePost from 'components/CreatePost';
import { Box, useMediaQuery } from '@mui/material';
import api from 'utils/API';

const Home = () => {
  // Make fetch call here via the home component level, will do first thing tomorrow
  // const [user, setUser] = useState(null) 
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)")
  const image = 'daikeen.jpg'
  const userId = '643059c59d990055ea7bb745'

  // if (!user) {
  //   return null
  // }

  return (
    <Box>
      <Navigation />
      <Box 
      width="100%" 
      padding="2rem 6%" 
      display={isNonMobileScreen ? "flex" : "block"}
      gap="0.5rem"
      justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
          <UserPanel image={image} userId={userId}/>
        </Box>
        <Box 
          flexBasis={isNonMobileScreen ? "42%" : undefined}
          marginTop={isNonMobileScreen ? undefined : "2rem"}
        >
          <CreatePost image={image} />
        </Box>
        {isNonMobileScreen && (
          <Box flexBasis={"26%"}></Box>
        )}
      </Box>
    </Box>
  );
};

export default Home;

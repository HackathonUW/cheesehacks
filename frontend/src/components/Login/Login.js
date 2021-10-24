import React from "react";
import { Box, Heading, Container, Button, Stack } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from 'react-router-dom';

import background from '../../images/volunteering2-2.png';
import logo from '../../images/logo.png';

import './Login.css'

function Login() {
  const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout,
  } = useAuth0();


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  } else {
    return (
      <Box 
          height={'100vh'}
          width={'100vw'}
          display={'grid'}
          placeItems={'center'}
          backgroundImage={background}
      >
        <div className="Container">
          <div>
            <Box display='flex' justifyContent='center'>
              <img 
              src={logo}
              width={300}
              height={300}
              alias='aeris'
              />
            </Box>
            <Heading
              fontWeight={600}
              textColor={'white'}
              fontSize={{ base: '2xl', sm: '4xl', md: '6xl'}}
              lineHeight={'110%'}
              textAlign={'center'}
              marginBottom={'5vh'}
            >
              AΞЯIS
            </Heading>
            <Heading
              fontWeight={400}
              textColor={'white'}
              fontSize={{base: 'xl', sm: '2xl', md: '4xl'}}
              lineHeight={'110%'}
              marginBottom={'5vh'}
              textAlign={'center'}
            >
              A simple manager for both organizers and volunteers
            </Heading>
            <Box display={'grid'} placeItems={'center'} >
              <Button 
                variant='solid'
                onClick={() => loginWithRedirect()}
                width={'10vw'}
              >Log In</Button>
            </Box>
          </div>
        </div>
      </Box>
    );
  }
}

export default Login;
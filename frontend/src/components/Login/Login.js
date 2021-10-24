import React from "react";
import { Box, Heading, Container, Button, Stack } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from 'react-router-dom';

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
      <Container maxW={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14}}
          py={{ base:20, md: 36}}
        >
        <Heading
          fontWeight={600}
          fontSize={{ base: '2xl', sm: '4xl', md: '6xl'}}
          lineHeight={'110%'}
        >
        Aeris
        </Heading>
        <Heading
          fontWeight={400}
          fontSize={{base: '2xl', sm: '4xl', md: '6xl'}}
          lineHeight={'110%'}
        >
           Volunteer Aggregator
        </Heading>
        </Stack>
        <Stack
                direction={'column'}
                spacing={3}
                align={'center'}
                alignSelf={'center'}
                position={'relative'}
        >
                <Button onClick={() => loginWithRedirect()}>Log In</Button>;
                <Button variant={'link'} colorScheme={'blue'} size={'sm'}>
                    Learn more
                </Button>
              </Stack>
      </Container>
    );
  }
}

export default Login;
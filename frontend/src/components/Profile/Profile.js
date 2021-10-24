import React from "react";
import { Box, Heading, Center, Image, Flex, Avatar, Button, Stack, Text, useColorModeValue, Textarea } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

function Profile() {
	const { user } = useAuth0();
	return (
		<div className="profile">
			<Box textAlign="center">
				<Heading>Profile</Heading>
			</Box>
      <Box
        maxW={'270px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}>
        <Image
          h={'120px'}
          w={'full'}
          src={'https://st2.depositphotos.com/3591429/6307/i/600/depositphotos_63075279-stock-photo-hands-holding-the-word-volunteer.jpg'
          
          }
          objectFit={'cover'}
        />
        <Flex justify={'center'} mt={-12}>
          <Avatar
            size={'xl'}
            src={user.picture}
            alt={'Author'}
            css={{
              border: '2px solid white',
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={'center'} mb={5}>
            <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
              {user.name}
            </Heading>
            <Text color={'gray.500'}>21, Wisconsin</Text>
          </Stack>

					<Textarea isReadOnly>
						
					</Textarea>

          <Button
            w={'full'}
            mt={8}
            bg={useColorModeValue('#151f21', 'gray.900')}
            color={'white'}
            rounded={'md'}
            _hover={{
              boxShadow: 'lg',
            }}>
            Send Email
          </Button>
        </Box>
      </Box>
		</div>
	);
}

export default Profile;
import {
  Box,
  Text,
  Flex,
  Avatar,
  HStack,
  VStack,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useAuth0 } from '@auth0/auth0-react';
import { FiChevronDown } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import logo from '../../images/logo.png';

import NavigationLink from './NavigationLink';

import './Navigation.css';

const Links = [
  {name: 'Map', route: '/dashboard/'},
  {name: 'Calendar', route: '/dashboard/calendar'},
  {name: 'Create Event', route: '/dashboard/volunteerevents'},
  {name: 'My Profile', route: '/dashboard/profile'}
];

function Navigation({children}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { logout, user } = useAuth0();

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <HStack>
            <img
                src={logo}
                width='35'
                height='35'
                className="d-inline-block align-top"
                alt='aeris'
            />
            <VStack
              display={{ base: 'none', md: 'flex' }}
              alignItems="flex-start"
              spacing="1px"
              ml="2">
              <Text fontSize="lg">AΞЯIS</Text>
            </VStack>
            </HStack>

            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <Link to={link.route} key={link.name}>
                  <NavigationLink>
                    {link.name}
                  </NavigationLink>
                </Link>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: 'none' }}>
                <HStack>
                  <VStack
                    display={{ base: 'none', md: 'flex' }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2">
                    <Text fontSize="sm">{user.name}</Text>
                  </VStack>
                  <Avatar
                    size={'sm'}
                    src={user.picture}
                  />
                  <Box display={{ base: 'none', md: 'flex' }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList>
                <MenuItem>My Profile</MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => logout({ returnTo: window.location.origin })}>Log out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavigationLink key={link}>{link}</NavigationLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Box p={4} className="Content">
        {children}
      </Box>
    </>
  );
}

export default Navigation;
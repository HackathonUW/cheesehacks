import { Link } from 'react-router-dom';
import { Box, useColorModeValue } from '@chakra-ui/react';

function NavigationLink({ to, label }) {
    return (
      <Box
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}>
      <Link to={to}>
        <Box
          px={2}
          py={1}
          rounded={'md'}
          _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
          }}>
            {label}
        </Box>
      </Link>
      </Box>
    );
}


export default NavigationLink;

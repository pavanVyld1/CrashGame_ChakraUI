// src/components/Header.tsx
import { Box, Flex, Text } from '@chakra-ui/react';

const Header = () => (
  <Flex justify="space-between" align="center" p="4" bg="gray.900" borderBottom="1px solid #2d3748">
    <Text fontSize="xl" fontWeight="bold" color="red.400">Aviator</Text>
    <Text fontWeight="bold" color="green.300">5,000.00 INR</Text>
  </Flex>
);

export default Header;

// src/components/GameCanvas.tsx
import { Box, Text } from '@chakra-ui/react';

const GameCanvas = () => {
  return (
    <Box flex="1" bgGradient="radial(blackAlpha.800, purple.800)" display="flex" alignItems="center" justifyContent="center" borderWidth="1px" borderColor={"white"}>
      <Text fontSize="6xl" fontWeight="bold" color="purple.200">11.96x</Text>
    </Box>
  );
};

export default GameCanvas;

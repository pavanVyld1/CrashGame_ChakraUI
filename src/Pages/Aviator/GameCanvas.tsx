// src/components/GameCanvas.tsx
import { Box, Text, useBreakpointValue } from '@chakra-ui/react';

const GameCanvas = () => {

  console.log("GameCanvas : Button clicked" );
  // return "GameCanvasFuc";

  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Box bgGradient="radial(blackAlpha.800, purple.800)" 
      display="flex" 
      alignItems="center" 
      justifyContent="center" 
      borderWidth="1px" 
      borderColor={"white"} 
      w={'full'}
      // h={isMobile? undefined : 'full'}
      h={'full'}
      // eslint-disable-next-line no-restricted-globals
      // aspectRatio={isMobile? 1.7 : undefined}
      >
      <Text fontSize="6xl" fontWeight="bold" color="purple.200">11.96x</Text>
    </Box>
  );
};



export default GameCanvas;

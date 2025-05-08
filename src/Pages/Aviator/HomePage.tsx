// src/pages/HomePage.tsx
import { Box, Button, Flex, Heading, Text ,useBreakpointValue} from '@chakra-ui/react'
import  Header from './Header';

import  PlayersList from './PlayerList';
import  GameCanvas  from './GameCanvas';
import  BettingControls from './BettingControls';
import Game from './Game';
import GameTestScroll from './GameTestScroll';
import MriyaGameUI from '../MriyaGameUI';

// export default function HomePage() {
//   return (
//     // <Box p={8} textAlign="center">
//     //   <Heading mb={4}>Welcome to Chakra UI</Heading>
//     //   <Text fontSize="lg" mb={6}>A modern component library for React.</Text>
//     //   <Button colorScheme="teal">Get Started</Button>
//     // </Box>

// <Flex direction="column" h="100vh" bg="gray.900">
// <Heading>" Hello Pavan Here" </Heading>
// <Header />
// <Flex flex={1} overflow="hidden">
//   <PlayersList />
//   <Flex direction="column" flex={1}>
//     <GameCanvas />
//     <BettingControls />
//   </Flex>
// </Flex>
// </Flex>
//   )
// }


export default function HomePage() {
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    // <Box p={8} textAlign="center">
    //   <Heading mb={4}>Welcome to Chakra UI</Heading>
    //   <Text fontSize="lg" mb={6}>A modern component library for React.</Text>
    //   <Button colorScheme="teal">Get Started</Button>
    // </Box>

<Flex direction={'column'} h="100vh" w="100vw" bg="gray.950" >
      <Header />

      <Flex flex={1} overflow="show" direction={isMobile ? "column" : undefined} >
          <PlayersList order={isMobile ? 2 : 0}/>
          <Flex direction="column" flex={1}>
            <GameTestScroll />
            {/* <MriyaGameUI /> */}
            <BettingControls />
          </Flex>
        </Flex>
    </Flex>
  )
}

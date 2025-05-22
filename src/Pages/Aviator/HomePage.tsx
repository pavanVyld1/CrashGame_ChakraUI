// src/pages/HomePage.tsx
import { Box, Button, Flex, Heading, Text ,useBreakpointValue, useMediaQuery} from '@chakra-ui/react'
import  Header from './Header';

import  PlayersList from './PlayerList';
import  GameCanvas  from './GameCanvas';
import  BettingControlsComponent from './BettingControlsComponent';
import Game from './Game';
import GameTestScroll from './GameTestScroll';
import MriyaGameUI from '../MriyaGameUI';
import { useEffect, useRef, useState } from 'react';
import { useOrientation } from '../../hooks/useOrientation';
import { SocketProvider } from '../../services/socketContext';
import TestSocketComponent from '../testSocketComponent';
// import { SocketProvider } from '../services/SocketContext';
// import GameComponent from './GameComponent';

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
  

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MmVlNjZiNjZkMmYyYjQ0MzY4NTk4ZiIsImlhdCI6MTc0NzkwNjQwNywiZXhwIjoxNzUwNDk4NDA3fQ.CO_7I0qLFQ2tB8CxY18o2G4KC_w5ymTgeG61tXMzZI4';

  const isMobileWidth = useBreakpointValue({ base: true, sm: true, md: false , lg: false, xl: false});
  const isMobileWidthName = useBreakpointValue({ base: "base", sm: "small", md: "md" , lg: "large", xl: "xl"});
  const isPortrait = useOrientation() === 'portrait';
  const isMobile = isMobileWidth && isPortrait;

  const headerRef = useRef<HTMLDivElement>(null);
  const gamecontainerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const playerListRef = useRef<HTMLDivElement>(null);
  const homePageref = useRef<HTMLDivElement>(null);

  console.log("Width Name : "+ isMobileWidthName);
  const [readyToRenderGame, setReadyToRenderGame] = useState(false);

  const [dimensions, setGameCanvasDimensions] = useState<{width: number; height: number;} | null>(null); 

    const updateDimensions = () => {
    if (!gamecontainerRef.current || !controlsRef.current || !playerListRef.current || !homePageref.current || !headerRef.current) return;
    
    
    const containerRect = gamecontainerRef.current.getBoundingClientRect();
    const controlsRect = controlsRef.current.getBoundingClientRect();
    const playerRect = playerListRef.current.getBoundingClientRect();
    const homePageRect = homePageref.current.getBoundingClientRect();
    const headerRect = headerRef.current.getBoundingClientRect();
    console.log("Home page isMobileWidth "+isMobileWidth+  " isMobile " + isMobile + " isPortrait : " + isPortrait);
    console.log("containerRect the Height "+ containerRect.height +" and width " + containerRect.width);
    console.log("controlsHeight the Height "+ controlsRect.height + " width :" + controlsRect.width);
    console.log("playerRect the Height "+ playerRect.height +" and width " + playerRect.width);
    console.log("homePageRect the Height "+ homePageRect.height +" and width " + homePageRect.width);
    console.log("headerRect the Height "+ headerRect.height +" and width " + headerRect.width);

    if(isMobile){
      console.log("playerrect the Height Mobile"+ playerRect.height);
      setGameCanvasDimensions({
        width: homePageRect.width,
        height: homePageRect.height// > 0 ? (homePageRect.height - playerRect.height - controlsRect.height - headerRect.height) : homePageRect.height,
      });
    } else {
      console.log("playerrect the Height "+ playerRect.height);
      console.log("homepage : width " + (homePageRect.width - playerRect.width) + " height : " +  (homePageRect.height - controlsRect.height));
     setGameCanvasDimensions({
        width: (homePageRect.width - playerRect.width),
        height: (homePageRect.height - controlsRect.height - headerRect.height),
      });
    }
    // console.log("Setting the Height "+ dimensions.height +" and width " + dimensions.width);
  };

    useEffect(() => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
        // setTimeout(updateDimensions, 0);
          console.log("Home page Use effect called");
          updateDimensions();
      });
    });
    // window.addEventListener("resize", updateDimensions);
    return () => {
      // window.removeEventListener("resize", updateDimensions);
    }
  },[]);


  return (
    // <Box p={8} textAlign="center">
    //   <Heading mb={4}>Welcome to Chakra UI</Heading>
    //   <Text fontSize="lg" mb={6}>A modern component library for React.</Text>
    //   <Button colorScheme="teal">Get Started</Button>
    // </Box>

<Flex direction={'column'} h="100vh" w="100vw" bg="gray.950" ref={homePageref} >
      <Box ref={headerRef}>
        <Header />
      </Box>
      <Flex flex={1} overflow="show" direction={isPortrait ? "column" : undefined} >
        <SocketProvider token={token}>
            <TestSocketComponent />
        </SocketProvider>
        <Box order={isPortrait ? 2 : 0} ref={playerListRef}>
          <PlayersList order={isPortrait ? 2 : 0}/>
        </Box>
         <Flex direction="column" flex={1}>
            
            {/* <MriyaGameUI /> */}
            <Box order={1} ref={controlsRef}>
              <BettingControlsComponent />
            </Box>
            <Box order={0} ref={gamecontainerRef}>
              {dimensions != null && <GameTestScroll width={dimensions.width} height={dimensions.height}/>}
              {/* <GameCanvas/> */}
            </Box>
          </Flex>

        </Flex>
    </Flex>
  )
}

          
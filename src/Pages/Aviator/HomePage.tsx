// src/pages/HomePage.tsx
import { Box, Button, Flex, Heading, Text ,useBreakpointValue, useMediaQuery, useToast} from '@chakra-ui/react'
import  Header from './Header';

import  PlayersList from './PlayerList';
import  GameCanvas  from './GameCanvas';
import  BettingControlsComponent from './BettingControlsComponent';
import Game from './Game';
import GameTestScroll from './GameTestScroll';
import MriyaGameUI from '../MriyaGameUI';
import { useEffect, useRef, useState } from 'react';
import { useOrientation } from '../../hooks/useOrientation';
import AuthPage from '../Auth/AuthPage';
import AuthPagerUpdated from '../Auth/AuthPageUpdated';
import { useNavigate } from 'react-router-dom';
import socketService from '../../services/socketService';
import { GameConstants } from '../../types/projectTypes';
import { API_CONSTANTS } from '../../types/dataConstants';
import SocketManager from '../Managers/SocketManager';
import CrashGameComponent from '../../components/CrashGameComponent';
import ApiService from '../../services/ApiService';
import DataService, { PlayerData }  from "../../services/dataService";
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

  const navigate = useNavigate();
  const toast = useToast();

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
      let token = localStorage.getItem("token");
      console.log("Home Page Trying to Connect");
      if(token){
        requestAnimationFrame(() => {
          requestAnimationFrame(async () => {
          // setTimeout(updateDimensions, 0);
            console.log("Home page Use effect called");
            updateDimensions();
            if(token){
              try {
                const response = await ApiService.getPlayerData(token);

                console.log("Home page Setting Player Data " + JSON.stringify(response));
                const user = response.data;
                const playerData: PlayerData = {
                  id: user._id,
                  name: user.name,
                  email: user.email,
                  wallet: user.wallet
                };
                console.log("Home page Setting Player Data After : " + JSON.stringify(playerData));
                DataService.setPlayerData(playerData);
              }
              catch (err: any) {
                toast({
                  title: 'Authentication failed',
                  description: err?.response?.message || 'Something went wrong',
                  status: 'error',
                  duration: 3000,
                  isClosable: true,
                });
              }
              
              SocketManager.onSessionStart((data) => {
                console.log("Session started:", data);
              });

              SocketManager.onSessionInfo((data) => {
                console.log("Session Info:", data);
              });

              SocketManager.onCrash((data) => {
                console.log("Crash :", data);
              });

              SocketManager.onTick((tick) => {
                console.log("Tick:", tick.value);
              });

              SocketManager.onSessionState((data) => {
                console.log("SessionState:", data);
              });

              SocketManager.initSocket(token.toString(), API_CONSTANTS.SOCKET_URL);
            }
        });
      });
    } else {
      // socketService.disconnect();
      navigate('/');
    }
    // window.addEventListener("resize", updateDimensions);
    return () => {
      SocketManager.disconnect();
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
        <Box order={isPortrait ? 2 : 0} ref={playerListRef}>
          <PlayersList order={isPortrait ? 2 : 0}/>
        </Box>
         <Flex direction="column" flex={1}>
            
            {/* <MriyaGameUI /> */}
            <Box order={1} ref={controlsRef}>
              <BettingControlsComponent />
            </Box>
            <Box order={0} ref={gamecontainerRef}>
              {/* {dimensions != null && <GameTestScroll width={dimensions.width} height={dimensions.height}/>} */}
              {/* <GameCanvas/> */}
              {dimensions != null && (
                // <Box w={dimensions.width} h={dimensions.height}>
                  <CrashGameComponent width={dimensions.width} height={dimensions.height}/>
                // </Box>  
              )}
            </Box>
          </Flex>

        </Flex>
    </Flex>
  )
}

          
import React, { useState, useEffect, useRef } from 'react';
import Phaser from 'phaser';
import TestScrollScene from '../../game/TestScrollScene';
// import PlayersList from './PlayersList';
// import UserPanel from './UserPanel';
// import BettingPanel from './BettingPanel';
// import { GameState, Player, WinHistoryItem } from '../../types/game';
// import { generateMockPlayers, generateWinHistory } from '../data/mockData';
// import { toaster } from "../../components/ui/toaster"
import { SpinePlugin } from "@esotericsoftware/spine-phaser"; 
import { Box, useBreakpointValue ,Text , useToast } from '@chakra-ui/react';
import PlayersList from './PlayerList';
import { useOrientation } from '../../hooks/useOrientation';
import CrashGameMainScene from '../../PhaserGame/KingFisher/scenes/CrashGameMainScene';

// const GameTestScroll: React.FC = () =>{//React.FC<{ width: number; height: number }> = ({ width, height }) => {
const GameTestScroll: React.FC<{ width: number; height: number }> = ({ width, height }) => {
  const toaster = useToast();

  const isMobileWidth = useBreakpointValue({ base: true, sm: true, md: false , lg: false, xl: false});
  const isPortrait = useOrientation() === 'portrait';
  const isMobile = isMobileWidth && isPortrait;

  const gameRef = useRef<HTMLDivElement | null>(null);
  const gameContainerRef = useRef<HTMLDivElement | null>(null);
  const gameInstanceRef = useRef<Phaser.Game | null>(null);
  const sceneRef = useRef<TestScrollScene | null>(null);
  
  const [computedWidth, setComputedWidth] = useState<number | null>(null);
  const [dimensions, setDimensions] = useState<{width: number; height: number;} | null>(null);
  // Initialize the game

  useEffect(() => {
    console.log("TestScroll  isMobile : " + isMobile);
    // const updateWidth = () => {
    //   const remInPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
    //   const vw = window.innerWidth;
    //   var value = 0;
    //   if(isMobile){
    //     value = window.innerWidth;
    //   }else{
    //     value = vw - (25 * remInPx);
    //   }
    //   console.log("computed w : " + value);
    //   setComputedWidth(value);
    // };


    const updateDimensions = () => {
      const remInPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      let width = 0;
      let height = 0;
      if (isMobile) {
        width = vw;
        height = vh - (20 * remInPx);;
      } else {
        width = vw - (25 * remInPx);
        height = vh;
      }
      console.log("Computed dimensions:", { width, height });
      setDimensions({ width, height });
    };

    // // updateWidth(); // Initial run
    updateDimensions(); // Initial run
    // window.addEventListener("resize", updateDimensions);
    console.log("Calculated and Passed height : " + height +" Width : " + width);
    setDimensions({ width, height });
    return () => {
      // window.removeEventListener("resize", updateDimensions);
    };
  },[])

  useEffect(() => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
    console.log("computed height : 1 " + vh);
    console.log("computed width : 1 " + vw);

    requestAnimationFrame(() => {
    console.log("computed width : 2 " + dimensions?.height);
    // if (!gameRef.current || gameInstanceRef.current || !gameContainerRef.current || !computedWidth) return;
    if(dimensions == null) return;

    if(gameRef.current == null)
      return;

    if(gameContainerRef.current == null)
      return;

    if(gameInstanceRef.current != null)
      return;
    console.log("gameRef.current.clientWidth " + gameContainerRef.current.clientWidth);
    console.log("gameRef.current.clientHeight " + gameContainerRef.current.clientHeight);
    
    // console.log("computed width : 3 " + computedWidth);
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: gameRef.current,
      width: width,
      height: height,
      backgroundColor: '#87CEEB',
      scene: [new TestScrollScene()],
      // scene: [new CrashGameMainScene()],
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      plugins: {
        scene: [
            {
                key: "spinePlugin",
                plugin: SpinePlugin,
                mapping: "spine",
            },
        ],
    },
    };
    
    if(!gameInstanceRef.current){
      gameInstanceRef.current = new Phaser.Game(config);
    }
    // Get reference to the scene
    sceneRef.current = gameInstanceRef.current.scene.getScene('TestScrollScene') as TestScrollScene;
  });
    return () => {
      if (gameInstanceRef.current) {
        console.log("Destroying the Game Instance");
        gameInstanceRef.current.destroy(true);
        gameInstanceRef.current = null;
        sceneRef.current = null;
      }
    };
  }, [dimensions]);

  return (
    // <Box w={'calc(100% - 0rem)'} bgColor={'black'} h={'calc(100% - 4rem)' }>
    // <Box w={"95%"} bgColor={'black'} h={'85%'}>
    <Box  
    display="flex" 
    alignItems="center" 
    justifyContent="center" 
    borderWidth="1px" 
    borderColor={"yellow"} 
    bgColor={"blue"}
    position={"relative"} alignSelf={"center"} alignContent={"center"}
    // w={ isMobile? 'full' : 'calc(100vw - 25rem)'}
    // // w={computedWidth}
    // // h={isMobile? undefined : 'full'}
    // // h={'full'}
    h={ isPortrait? 'calc(100vh * 1 / 3)' : dimensions?.height}
    w={ isPortrait? 'full' : dimensions?.width}
    // h={isMobile ? 'full' : dimensions?.height}
    ref={gameContainerRef}
    >
        <Box ref={gameRef}>

        </Box>
    </Box>
    // <Box ref={gameRef} flex="1" w={ isMobile? 'full' : 'calc(100vw - 25rem)'} h="100%" />
  );
};
export default GameTestScroll;
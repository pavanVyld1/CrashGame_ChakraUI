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

const GameTestScroll: React.FC = () => {
    const toaster = useToast();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const gameRef = useRef<HTMLDivElement | null>(null);
  const gameContainerRef = useRef<HTMLDivElement | null>(null);
  const gameInstanceRef = useRef<Phaser.Game | null>(null);
  const sceneRef = useRef<TestScrollScene | null>(null);
  
  const [computedWidth, setComputedWidth] = useState<number | null>(null);
  // Initialize the game

  useEffect(() => {
    const updateWidth = () => {
      const remInPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
      const vw = window.innerWidth;
      var value = 0;
      if(isMobile){
        value = window.innerWidth;
      }else{
        value = vw - (25 * remInPx);
      }
      console.log("computed w : " + value);
      setComputedWidth(value);
    };

    updateWidth(); // Initial run

    // window.addEventListener("resize", updateWidth);
    return () => {
      // window.removeEventListener("resize", updateWidth);
    };
  },[])

  useEffect(() => {
    console.log("computed width : 1 " + computedWidth);

    requestAnimationFrame(() => {
    console.log("computed width : 2 " + computedWidth);
    // if (!gameRef.current || gameInstanceRef.current || !gameContainerRef.current || !computedWidth) return;
    if(computedWidth == null) return;

    if(gameRef.current == null)
      return;

    if(gameContainerRef.current == null)
      return;

    if(gameInstanceRef.current != null)
      return;
    console.log("gameRef.current.clientWidth " + gameContainerRef.current.clientWidth);
    
    console.log("computed width : 3 " + computedWidth);
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: gameRef.current,
      width: 1000,
      height: gameContainerRef.current.clientHeight,
      backgroundColor: '#87CEEB',
      scene: [new TestScrollScene()],
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
  }, [computedWidth]);

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
    w={ isMobile? 'full' : 'calc(100vw - 25rem)'}
    // w={computedWidth}
    // h={isMobile? undefined : 'full'}
    h={'full'}
    ref={gameContainerRef}
    >
        <Box ref={gameRef}>

        </Box>
    </Box>
    // <Box ref={gameRef} flex="1" w={ isMobile? 'full' : 'calc(100vw - 25rem)'} h="100%" />
  );
};
export default GameTestScroll;
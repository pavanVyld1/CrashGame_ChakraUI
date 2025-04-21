import React, { useState, useEffect, useRef } from 'react';
import Phaser, { Scene } from 'phaser';
import TestScrollScene from '../../game/TestScrollScene';
// import PlayersList from './PlayersList';
// import UserPanel from './UserPanel';
// import BettingPanel from './BettingPanel';
// import { GameState, Player, WinHistoryItem } from '../../types/game';
// import { generateMockPlayers, generateWinHistory } from '../data/mockData';
// import { toaster } from "../../components/ui/toaster"
import { SpinePlugin } from "@esotericsoftware/spine-phaser"; 
import { Box, useBreakpointValue ,Text , useToast, Flex } from '@chakra-ui/react';

const GameTestScroll: React.FC = () => {
    const toaster = useToast();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const gameRef = useRef<HTMLDivElement>(null);
  const gameInstanceRef = useRef<Phaser.Game | null>(null);
  const sceneRef = useRef<TestScrollScene | null>(null);


  const resizeGame = () => {
    if (!gameInstanceRef.current) return;
    if(!gameRef.current) return;

    const container = gameRef.current;
    let aspectRatio = 1280/720;
    if (!container) return;
    const width = container.getBoundingClientRect().width;
    const height = container.getBoundingClientRect().height;
    // const height = width / aspectRatio;// container.getBoundingClientRect().height;
    let scene = gameInstanceRef.current.scene.getScene('TestScrollScene') as TestScrollScene;
    console.log("Resize container Hight : " + height + "  w : " + width);
    // gameInstanceRef.current?.scale.resize(width, height);
    if(scene !== null){
      // console.log("Resize is called : w: " + width + "  h : " + height);
      scene.resize(width,height);
    }
    // gameInstanceRef.current.scale.resize(width, height);
  };

  // Initialize the game
  useEffect(() => {
    if (!gameRef.current || gameInstanceRef.current) return;
    
    console.log("game Ref : W = " + gameRef.current.getBoundingClientRect().width + " h = " + gameRef.current.getBoundingClientRect().height + " Id : " + gameRef.current.id + "  Left : " + gameRef.current.getBoundingClientRect().left);
    

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: gameRef.current,
      width: "100%",
      height: "100%",
      backgroundColor: '#87CEEB',
      scene: [new TestScrollScene()],
      scale: {
        mode: Phaser.Scale.NONE,
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
    
    if(sceneRef.current == null){
      // Get reference to the scene
      let scene = gameInstanceRef.current.scene.getScene('TestScrollScene') as TestScrollScene;
      scene?.resize(gameRef.current.clientWidth, gameRef.current.clientHeight);
      sceneRef.current = scene;
      console.log("Scene is assigned 1 : " + sceneRef.current);
    }
    console.log("Scene is assigned 2 : " + sceneRef.current);

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(() =>{
        resizeGame();
      });
    });

    if (gameRef.current) resizeObserver.observe(gameRef.current);

    window.addEventListener("resize", resizeGame);

    return () => {
      if (gameInstanceRef.current) {
        // resizeObserver.disconnect();
        gameInstanceRef.current.destroy(true);
        gameInstanceRef.current = null;
        sceneRef.current = null;
      }
    };
  }, []
);

  return (
    // <Box w={'calc(100% - 0rem)'} bgColor={'black'} h={'calc(100% - 4rem)' }>
    // <Box 
    //   display="flex" 
    //   alignItems="center" 
    //   justifyContent="center" 
    //   borderWidth="5px" 
    //   borderColor={"yellow"} 
    //   // ref={gameRef}
    //   w='full'
    //   h={'full'}>
    //     <Box 
    //     id="gameCanvas"
    //     borderWidth="3px" 
    //     borderColor={"blue"}
    //     w={'full'} 
    //     h={'full'}
    //     ref={gameRef}
    //     >

    //     </Box>
    // </Box>
  <Flex
  // display="flex"
  id="gamediv"
  ref={gameRef}
  w="full"
  h="full" // equivalent to h-80 in Tailwind (80 * 0.25rem = 20rem)
  borderRadius="lg"
  overflow="hidden"
  aspectRatio={isMobile? 1.7 : undefined}
  />
  );
};
export default GameTestScroll;
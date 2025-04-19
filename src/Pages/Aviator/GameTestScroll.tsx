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
  const gameRef = useRef<HTMLDivElement>(null);
  const gameInstanceRef = useRef<Phaser.Game | null>(null);
  const sceneRef = useRef<TestScrollScene | null>(null);
  
  // Initialize the game
  useEffect(() => {
    if (!gameRef.current || gameInstanceRef.current) return;
    
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: gameRef.current,
      width: '100%',
      height: 40,
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
    
    return () => {
      if (gameInstanceRef.current) {
        gameInstanceRef.current.destroy(true);
        gameInstanceRef.current = null;
        sceneRef.current = null;
      }
    };
  }, []);

  return (
    // <Box w={'calc(100% - 0rem)'} bgColor={'black'} h={'calc(100% - 4rem)' }>
    <Box w={"90%"} bgColor={'black'} h={'80%'}>
        <Box ref={gameRef}>

        </Box>
    </Box>
  );
};
export default GameTestScroll;
import React, { useState, useEffect, useRef } from 'react';
import Phaser from 'phaser';
import CrashScene from '../../game/CrashScene';
// import PlayersList from './PlayersList';
// import UserPanel from './UserPanel';
// import BettingPanel from './BettingPanel';
import { GameState, Player, WinHistoryItem } from '../../types/game';
// import { generateMockPlayers, generateWinHistory } from '../data/mockData';
// import { toaster } from "../../components/ui/toaster"
import { SpinePlugin } from "@esotericsoftware/spine-phaser"; 
import { Box, useBreakpointValue ,Text , useToast } from '@chakra-ui/react';

const Game: React.FC = () => {
    const toaster = useToast();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const gameRef = useRef<HTMLDivElement>(null);
  const gameInstanceRef = useRef<Phaser.Game | null>(null);
  const sceneRef = useRef<CrashScene | null>(null);
  
  // Game state
  const [gameState, setGameState] = useState<GameState>({
    status: 'waiting',
    currentMultiplier: 1.0,
    crashPoint: null,
    betAmount: 50,
    autoCashoutValue: 1.5,
    isAutoCashout: false,
    userBalance: 1000,
  });
  
  // Player state
//   const [players, setPlayers] = useState<Player[]>(generateMockPlayers());
//   const [winHistory, setWinHistory] = useState<WinHistoryItem[]>(generateWinHistory(10));
  const [currentBet, setCurrentBet] = useState<number | null>(null);
  const [username, setUsername] = useState('Player');
  
  // Initialize the game
  useEffect(() => {
    if (!gameRef.current || gameInstanceRef.current) return;
    
    const handleMultiplierChange = (value: number) => {
      setGameState(prev => ({ ...prev, currentMultiplier: value }));
      
      // Check if auto cashout is enabled and should trigger
      if (gameState.isAutoCashout && 
          currentBet !== null && 
          value >= gameState.autoCashoutValue) {
        handleCashout();
      }
    };
    
    const handleCrashed = (crashPoint: number) => {
      console.log(`Game crashed at ${crashPoint}x`);
      setGameState(prev => ({ 
        ...prev, 
        status: 'crashed', 
        crashPoint
      }));
      
      // Reset current bet if player didn't cash out
      if (currentBet !== null) {
        setCurrentBet(null);
        toaster({
          title: "Game crashed!",
          description: `You lost ${gameState.betAmount.toFixed(2)}€`,
          variant: "destructive",
        });
      }
      
      // Schedule next round
      setTimeout(startNextRound, 3000);
    };
    
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: gameRef.current,
      width: '100%',
      height: 40,
      backgroundColor: '#87CEEB',
      scene: [new CrashScene({ onMultiplierChange: handleMultiplierChange, onCrashed: handleCrashed })],
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
    
    gameInstanceRef.current = new Phaser.Game(config);
    
    // Get reference to the scene
    sceneRef.current = gameInstanceRef.current.scene.getScene('CrashScene') as CrashScene;
    
    return () => {
      if (gameInstanceRef.current) {
        gameInstanceRef.current.destroy(true);
        gameInstanceRef.current = null;
        sceneRef.current = null;
      }
    };
  }, []);

  // Start next round function
  const startNextRound = () => {
    console.log("Starting next round function called");
    // Generate new players
    // setPlayers(generateMockPlayers());
    
    // Reset game state
    setGameState(prev => ({
      ...prev,
      status: 'waiting',
      currentMultiplier: 1.0,
      crashPoint: null
    }));
    
    // Schedule the game to start after a delay
    setTimeout(() => {
      if (!sceneRef.current) {
        console.error("Scene reference is null, can't start game");
        if (gameInstanceRef.current) {
          sceneRef.current = gameInstanceRef.current.scene.getScene('CrashScene') as CrashScene;
          if (!sceneRef.current) {
            console.error("Still couldn't get scene reference");
            return;
          }
        } else {
          return;
        }
      }
      
      console.log("Starting new game round...");
      sceneRef.current.startGame();
      setGameState(prev => ({ ...prev, status: 'running' }));
    }, 6000);
  };
  
  useEffect(() => {
    // Start the game when component mounts
    const timer = setTimeout(() => {
      console.log("Initial game start timer triggered");
      if (!sceneRef.current && gameInstanceRef.current) {
        sceneRef.current = gameInstanceRef.current.scene.getScene('CrashScene') as CrashScene;
      }
      startNextRound();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle bet placement
  const handlePlaceBet = () => {
    if (gameState.status !== 'waiting') {
      console.log("Can't place bet - game status:", gameState.status);
      return;
    }
    
    if (gameState.betAmount <= 0 || gameState.betAmount > gameState.userBalance) {
      toaster({
        title: "Invalid bet amount",
        description: "Please enter a valid bet amount",
        variant: "destructive",
      });
      console.log("HandlePlaceBet : " + "Invalid bet amt - Please Enter a valid amt" );
      return;
    }
    
    console.log("Placing bet:", gameState.betAmount);
    setCurrentBet(gameState.betAmount);
    setGameState(prev => ({ 
      ...prev, 
      userBalance: prev.userBalance - prev.betAmount,
      status: 'running' // Immediately update status to running
    }));
    
    // Start the game if it's in waiting state and scene is available
    if (sceneRef.current) {
      console.log("Starting game after bet placement");
      sceneRef.current.startGame();
    } else {
      console.error("Scene reference is null, can't start game after bet placement");
      // Try to get the scene reference again
      if (gameInstanceRef.current) {
        sceneRef.current = gameInstanceRef.current.scene.getScene('CrashScene') as CrashScene;
        if (sceneRef.current) {
          console.log("Retrieved scene reference, starting game now");
          sceneRef.current.startGame();
        } else {
          console.error("Failed to get scene reference after retry");
          // Revert the bet as we can't start the game
          setCurrentBet(null);
          setGameState(prev => ({ 
            ...prev, 
            userBalance: prev.userBalance + gameState.betAmount,
            status: 'waiting'
          }));
          
          toaster({
            title: "Error starting game",
            description: "Please refresh the page and try again",
            variant: "destructive",
          });
          console.log("Error Starting Game");
        }
      }
    }
    
    // toaster({
    //   title: "Bet placed",
    //   description: `You bet ${gameState.betAmount.toFixed(2)}€`,
    // });
    console.log("Bet Placed");
  };
  
  // Handle cashout
  const handleCashout = () => {
    if (gameState.status !== 'running' || currentBet === null) {
      console.log("Can't cashout - game status:", gameState.status, "currentBet:", currentBet);
      return;
    }
    
    const winAmount = currentBet * gameState.currentMultiplier;
    
    // Update user balance
    setGameState(prev => ({ ...prev, userBalance: prev.userBalance + winAmount }));
    
    // Add to win history
    const newWinItem: WinHistoryItem = {
      id: `win-${Date.now()}`,
      date: new Date(),
      betAmount: currentBet,
      cashoutMultiplier: gameState.currentMultiplier,
      winAmount
    };
    
    // setWinHistory(prev => [newWinItem, ...prev].slice(0, 20));
    
    // Reset current bet
    setCurrentBet(null);
    
    toaster({
      title: "Cashout successful!",
      description: `You won ${winAmount.toFixed(2)}€ (${gameState.currentMultiplier.toFixed(2)}x)`,
    });

  };
  return (
    // <Box bgGradient="radial(blackAlpha.800, purple.800)" 
    //       display="flex" 
    //       alignItems="center" 
    //       justifyContent="center" 
    //       borderWidth="1px" 
    //       borderColor={"white"} 
    //       w='full'
    //     //   h={isMobile? undefined : 'full'}
    //       aspectRatio={isMobile? 1.7 : undefined}
    //       ref={gameRef}
    //     //   w='50rem'
    //       h='40rem'
    //       overflow="hidden"
    //       >
    //       {/* <Text fontSize="6xl" fontWeight="bold" color="purple.200">11.96x</Text> */}
    // </Box>
    // <Box flex="1" bgGradient="radial(blackAlpha.800, purple.800)" display="flex" alignItems="center" 
    // justifyContent="center" borderWidth="1px" borderColor={"white"}
    // ref={gameRef}
    // overflow={'hidden'}>
    // </Box>

    // <Box w={'calc(100% - 0rem)'} bgColor={'black'} h={'calc(100% - 4rem)' }>
    <Box w={400} bgColor={'black'} h={'calc(100% - 4rem)' }>
        <Box ref={gameRef}>

        </Box>
    </Box>
  );
};
export default Game;
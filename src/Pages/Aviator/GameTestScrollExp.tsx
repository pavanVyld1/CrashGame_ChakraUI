import React, { useState, useEffect, useRef } from 'react';
import Phaser, { Scene } from 'phaser';
import TestScrollScene from '../../game/TestScrollScene';

import { SpinePlugin } from "@esotericsoftware/spine-phaser"; 
import { Box, useBreakpointValue ,Text , useToast } from '@chakra-ui/react';

const GameTestScrollExp = () => {
    const isMobile = useBreakpointValue({ base: true, md: false });
    const gameRef = useRef<HTMLDivElement>(null);
    const gameInstanceRef = useRef<Phaser.Game | null>(null);
    const sceneRef = useRef<TestScrollScene | null>(null);

    console.log("Creating and sending the canvas before");
  
    if (gameRef.current ){

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

    // const resizeObserver = new ResizeObserver(() => {
    //     requestAnimationFrame(() =>{
    //         if (!gameInstanceRef.current) return;
    //         if(!gameRef.current) return;
    //         const container = gameRef.current;
        
    //         if (!container) return;
    //         const width = container.getBoundingClientRect().width;
    //         const height = container.getBoundingClientRect().height;
    //         let scene = gameInstanceRef.current.scene.getScene('TestScrollScene') as TestScrollScene;
    //         console.log("Resize container Hight : " + height + "  w : " + width);
    //         // gameInstanceRef.current?.scale.resize(width, height);
    //         if(scene !== null){
    //           // console.log("Resize is called : w: " + width + "  h : " + height);
    //         //   scene.resize(width,height);
    //         }
    //         // gameInstanceRef.current.scale.resize(width, height);
    //     });
    //   });
  
    //   if (gameRef.current) resizeObserver.observe(gameRef.current);

    if(sceneRef.current == null){
          // Get reference to the scene
          let scene = gameInstanceRef.current.scene.getScene('TestScrollScene') as TestScrollScene;
          scene?.resize(gameRef.current.clientWidth, gameRef.current.clientHeight);
          sceneRef.current = scene;
          console.log("Scene is assigned 1 : " + sceneRef.current);
        }
        console.log("Scene is assigned 2 : " + sceneRef.current);
    }
    return (
      <Box bgGradient="radial(blackAlpha.800, purple.800)" 
        display="flex" 
        alignItems="center" 
        justifyContent="center" 
        borderWidth="3px" 
        borderColor={"white"} 

        ref={gameRef}
        // h={isMobile? undefined : 'full'}
        // eslint-disable-next-line no-restricted-globals
        // aspectRatio={isMobile? 1.7 : undefined}
        >
        {/* <Text fontSize="6xl" fontWeight="bold" color="purple.200">11.96x</Text> */}
         <Box borderWidth="3px" borderColor={"blue"} bgColor={'black'} width="full" height={"full"}>
        
          </Box>
      </Box>
    );
  };
  
  export default GameTestScrollExp;
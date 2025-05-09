// src/components/PlayersList.tsx
import { Box, Text, VStack, HStack, Divider, GridItem, Grid, useBreakpointValue, Heading, BoxProps, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { useOrientation } from '../../hooks/useOrientation';

// const mockPlayers = Array.from({ length: 20 }).map((_, i) => ({
//   player: `d***${i}`,
//   bet: '100.00',
//   win: '',
// }));

interface PlayerBet {
  player: string;
  bet: string;
  collect: string;
  win: string;
}

const mockPlayers = new Array<PlayerBet>(
  { player: "player7048", bet: "2,500.00 USD", collect: "1.56", win: "3,900.00 USD" },
  { player: "player7048", bet: "1,000.00 USD", collect: "--", win: "--" },
  { player: "player2870", bet: "500.00 USD", collect: "1.63", win: "615.00 USD" },
  { player: "player7810", bet: "500.00 USD", collect: "--", win: "--" },
  { player: "player7811", bet: "100.00 USD", collect: "--", win: "--" },
  { player: "player7812", bet: "100.00 USD", collect: "--", win: "--" },
  { player: "player7813", bet: "100.00 USD", collect: "--", win: "--" },
  { player: "player7814", bet: "100.00 USD", collect: "--", win: "--" },
  { player: "player7812", bet: "100.00 USD", collect: "--", win: "--" },
  { player: "player7813", bet: "100.00 USD", collect: "--", win: "--" },
  { player: "player7814", bet: "100.00 USD", collect: "--", win: "--" },
  
);

type customBoxProps = BoxProps & {
  children?: React.ReactNode;
};

const PlayersList = (props: customBoxProps) => {
    const isMobileWidth = useBreakpointValue({ base: true, sm: true, md: false , lg: false, xl: false});
    const isPortrait = useOrientation() === 'portrait';
    const isMobile = isMobileWidth && isPortrait;


    console.log("Player List : isMobile " + isMobile);
  return (
    // <Box w="100" bg="gray.800" p="4" overflowX="auto" overflowY="auto" borderWidth="1px" borderColor={"red"} minH={100}>
    //   <Text fontWeight="bold" mb="4" color="white">All Bets</Text>
    //   <VStack align="stretch" spacing="2">
    //     {mockPlayers.map((p, i) => (
    //       <HStack key={i} justify="space-between" color="gray.200">
    //         <Text w="1/3" isTruncated>{p.player}</Text>
    //         <Text w="1/3">{p.bet}</Text>
    //         <Text w="1/3" textAlign="right" color="green.400">{p.win}</Text>
    //       </HStack>
    //     ))}
    //   </VStack>
    // </Box>

    <Flex
      bg="gray.800"
      backdropFilter="blur(8px)"
      border="1px solid"
      borderColor="gray.600"
      minW={isPortrait ? "full" : "25rem"}
      minH={isPortrait ? "20rem" : "auto"}
      w={isPortrait ? "full" : "25rem"}
      h={isPortrait ? "20rem" : "full"}
      borderRadius="md"
      overflow="hidden"
      direction={'column'}
      // {...props}
    >
      <Box p={4} borderBottom="1px solid" borderColor="gray.600">
        <Heading size="md" color="gray.200">Players</Heading>
      </Box>

      <Box overflowY={'auto'} border="1px solid" borderColor="gray.600" maxH={{ base: "calc(100% - 4rem)", md: "calc(100% - 10rem)" }}
      > 
        {/* style={ { maxHeight: isMobile ? "calc(100% - 4rem)" : "calc(100% - 5rem)" }} */}
        <VStack spacing={2} align="stretch" p={4} overflowY="auto">
          <Grid templateColumns="repeat(4, 1fr)" fontSize="sm" color="gray.400" pb={2}>
            <GridItem>User</GridItem>
            <GridItem>Bet</GridItem>
            <GridItem>Collect</GridItem>
            <GridItem>Win</GridItem>
          </Grid>

          {mockPlayers.map((player, index) => (
            <Grid
              key={index}
              templateColumns="repeat(4, 1fr)"
              fontSize="sm"
              py={2}
              borderBottom="1px solid"
              borderColor="gray.700"
              _hover={{ bg: "gray.700" }}
              transition="background 0.2s"
            >
              <GridItem color="blue.300" isTruncated>{player.player}</GridItem>
              <GridItem color="gray.200" isTruncated>{player.bet}</GridItem>
              <GridItem color="gray.200" isTruncated>{player.collect}</GridItem>
              <GridItem color="green.400" isTruncated>{player.win}</GridItem>
            </Grid>
          ))}
        </VStack>
      </Box>
    </Flex>
  );
};

export default PlayersList;

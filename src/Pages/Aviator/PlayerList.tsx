// src/components/PlayersList.tsx
import { Box, Text, VStack, HStack, Divider } from '@chakra-ui/react';

const mockPlayers = Array.from({ length: 20 }).map((_, i) => ({
  player: `d***${i}`,
  bet: '100.00',
  win: '',
}));

const PlayersList = () => {
  return (
    <Box w="64" bg="gray.800" p="4" overflowY="auto" borderWidth="1px" borderColor={"red"}>
      <Text fontWeight="bold" mb="4" color="white">All Bets</Text>
      <VStack align="stretch" spacing="2">
        {mockPlayers.map((p, i) => (
          <HStack key={i} justify="space-between" color="gray.200">
            <Text w="1/3" isTruncated>{p.player}</Text>
            <Text w="1/3">{p.bet}</Text>
            <Text w="1/3" textAlign="right" color="green.400">{p.win}</Text>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default PlayersList;

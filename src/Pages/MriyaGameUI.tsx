import React from "react";
import {
  Box,
  Grid,
  GridItem,
  Text,
  Input,
  Button,
  VStack,
  HStack,
  Select,
  useBreakpointValue,
  Flex,
} from "@chakra-ui/react";

const players = [
  { user: "player7048", bet: "2,500.00 USD", collect: "1.56", win: "3,900.00 USD" },
  { user: "player2870", bet: "500.00 USD", collect: "1.63", win: "815.00 USD" },
  { user: "player0070", bet: "5.00 USD", collect: "1.61", win: "8.05 USD" },
];

const MriyaGameUI: React.FC = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box p={4} bg="gray.800" minH="100vh" color="white">
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        MRIYA
      </Text>

      <Grid templateColumns={{ base: "1fr", md: "2fr 3fr" }} gap={4}>
        {/* Player Info and Bets */}
        <Box>
          <Text fontSize="lg" mb={2}>Players</Text>
          <Grid templateColumns="repeat(4, 1fr)" gap={2} fontSize="sm">
            <Text fontWeight="bold">User</Text>
            <Text fontWeight="bold">Bet</Text>
            <Text fontWeight="bold">Collect</Text>
            <Text fontWeight="bold">Win</Text>
            {players.map((p, i) => (
              <React.Fragment key={i}>
                <Text>{p.user}</Text>
                <Text>{p.bet}</Text>
                <Text>{p.collect}</Text>
                <Text color="green.300">{p.win}</Text>
              </React.Fragment>
            ))}
          </Grid>
        </Box>

        {/* Game Area */}
        <Box textAlign="center">
          <Text fontSize="4xl" color="yellow.300">
            1.69X
          </Text>
          <Text mt={2}>✈️ with parachutes</Text>
        </Box>
      </Grid>

      {/* Bet Controls */}
      <Flex
        mt={6}
        direction={{ base: "column", md: "row" }}
        gap={4}
        justify="center"
        align="center"
      >
        <VStack spacing={2} w={{ base: "100%", md: "200px" }}>
          <Text>Bet</Text>
          <Input defaultValue="1.00 USD" bg="white" color="black" />
          <HStack>
            <Button size="sm">1 USD</Button>
            <Button size="sm">5 USD</Button>
            <Button size="sm">10 USD</Button>
            <Button size="sm" colorScheme="red">ALL IN</Button>
          </HStack>
        </VStack>

        <VStack spacing={2} w={{ base: "100%", md: "200px" }}>
          <Text>Collect</Text>
          <Input defaultValue="1.30x" bg="white" color="black" />
          <Button colorScheme="yellow" w="full">
            Place your bet
          </Button>
        </VStack>
      </Flex>
    </Box>
  );
};

export default MriyaGameUI;

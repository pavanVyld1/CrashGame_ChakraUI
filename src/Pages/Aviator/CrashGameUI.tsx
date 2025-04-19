import {
    Box,
    Flex,
    Grid,
    GridItem,
    Text,
    Heading,
    Button,
    Input,
    Select,
    useBreakpointValue,
    Stack,
    HStack,
    VStack,
    Divider,
    Container,
    SimpleGrid
  } from "@chakra-ui/react";
  
  const CrashGameUI = () => {
    const isMobile = useBreakpointValue({ base: true, md: false });
  
    return (
      <Flex direction="column" minH="100vh" bg="blue.900" color="white">
        {/* Header */}
        <Flex justify="space-between" align="center" px={4} py={2} bg="blue.800">
          <Heading size="md">MRIYA</Heading>
          <Flex align="center" gap={4}>
            <Text>player2125</Text>
            <Text bg="yellow.400" color="black" px={3} py={1} rounded="md">
              13.07 USD
            </Text>
          </Flex>
        </Flex>
  
        {/* Game Layout */}
        <Flex flex="1" direction={isMobile ? "column" : "row"} borderWidth="1px" borderColor={"white"}>
          {/* Players List */}
          <Box
            flexBasis={isMobile ? "100%" : "25%"}
            p={4}
            bg="blue.800"
            overflowY="auto"
            borderWidth="1px" borderColor={"black"}
          >
            <Flex justify="space-between" mb={2}>
              <Text fontWeight="bold">Players</Text>
              <Text>My bets</Text>
            </Flex>
            <VStack align="stretch" spacing={2} fontSize="sm">
              {[
                { user: "player7048", bet: "2,500.00 USD", collect: "1.56", win: "3,900.00 USD" },
                { user: "player2870", bet: "500.00 USD", collect: "1.63", win: "815.00 USD" },
                { user: "player0070", bet: "5.00 USD", collect: "1.61", win: "8.05 USD" }
                // Add more entries here...
              ].map((player, i) => (
                <Flex key={i} justify="space-between">
                  <Text>{player.user}</Text>
                  <Text>{player.bet}</Text>
                  <Text>{player.win ? player.win : "--"}</Text>
                </Flex>
              ))}
            </VStack>
          </Box>
  
          {/* Game Screen */}
          <Flex
            flex="1"
            direction="column"
            justify="center"
            align="center"
            bg="blue.700"
          >
            <VStack spacing={4}>
              <Text fontSize="6xl" color="orange.300">
                1.69X
              </Text>
              <Box boxSize="100px" bg="gray.300" rounded="full" />
              {/* You can replace above with plane + parachute animation */}
            </VStack>
          </Flex>
        </Flex>
  
        {/* Betting Controls */}
        <Box bg="blue.800" py={4} px={4}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            {[1, 2].map((idx) => (
              <HStack key={idx} spacing={3} justify="space-between">
                <VStack spacing={1} align="start">
                  <Text fontSize="sm">Bet</Text>
                  <Input defaultValue="1.00 USD" w="100px" bg="white" color="black" />
                  <HStack spacing={1}>
                    <Button size="sm">1 USD</Button>
                    <Button size="sm">5 USD</Button>
                    <Button size="sm">10 USD</Button>
                    <Button size="sm" colorScheme="orange">
                      ALL IN
                    </Button>
                  </HStack>
                </VStack>
                <VStack spacing={1} align="start">
                  <Text fontSize="sm">Collect</Text>
                  <Input defaultValue={idx === 1 ? "1.30x" : "2.50x"} w="80px" bg="white" color="black" />
                  <Button colorScheme="yellow" w="100%">
                    Place your bet
                  </Button>
                </VStack>
              </HStack>
            ))}
          </SimpleGrid>
        </Box>
      </Flex>
    );
  };
  
  export default CrashGameUI;
  
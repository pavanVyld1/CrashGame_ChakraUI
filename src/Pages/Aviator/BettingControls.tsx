// // src/components/BettingControls.tsx
// import { Box, Button, HStack, NumberInput, NumberInputField } from '@chakra-ui/react';

// const BettingControls = () => {
//   return (
//     <HStack p="4" bg="gray.900" spacing="4" justify="center">
//       <NumberInput maxW="100px" defaultValue={10}>
//         <NumberInputField />
//       </NumberInput>
//       <Button colorScheme="green" size="lg">Bet</Button>
//     </HStack>
//   );
// };

// export default BettingControls;

import { Button, Input, Box, Grid, Stack, Text, Flex,useBreakpointValue, color, HStack, Icon, Center, VStack, Heading } from "@chakra-ui/react";
import { MinusIcon, AddIcon } from "@chakra-ui/icons";
import { FaBold } from "react-icons/fa";
import Header from "./Header";

const BettingControls = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Grid
      templateColumns={isMobile ? "1fr" : "1fr 1fr"}
      gap={4}
      bg={"slateblue"}
      p={4}
      borderTop="1px solid"
      borderColor={"yellow.400"}
      borderWidth={2}
      backdropFilter="blur(8px)"
    >
      {/* LEFT SIDE */}
      <Stack spacing={4}>
        <Flex flexWrap="wrap" align="center" gap={2} borderTop="1px solid" borderColor={"yellow.400"} borderWidth={2} alignItems="stretch" bgColor={"gray.900"}>
          <VStack borderWidth={1} gap={2} bgColor={"gray.900"} borderRadius={"md"} borderColor={"gray.700"} alignItems={"center"} >
          <Heading fontSize={"sm"} color="gray.100">Bet</Heading>
          <HStack borderWidth={1} gap={1} bgColor={"gray.700"} borderRadius={"full"} borderColor={"gray.900"}>
          <Button background={"gray.700"} variant={"solid"} rounded={"full"} w={9} h={9} iconSpacing={2}> {/* need to add on click*/}
            <MinusIcon color={"white"}/>
          </Button>
          {/* <Icon as={MinusIcon} color={"white"} borderRadius={"full"} background={"gray.800"} w={7} h={7} fontSize={10}/> */}
          <Input
            type="number"
            defaultValue="1.00"
            w={100}
            bg="gray.700"
            color="white"
            _placeholder={{ color: "gray.400" }}
            focusBorderColor="white"
            textAlign={"center"}
            fontWeight={"bold"}
          ></Input>
          <Text color="gray.400" fontSize={"md"} fontWeight={"bold"}>USD</Text>
          <Button background={"gray.700"} variant={"solid"} rounded={"full"} w={9} h={9} iconSpacing={2}> {/* need to add on click*/}
            <AddIcon color={"white"} />
          </Button>
          </HStack>
          <Flex flexWrap="wrap" gap={2} mt={{ base: 2, sm: 0 }} borderTop="1px solid" borderColor={"yellow.400"} borderWidth={2} direction={"row"}>
            <Button variant="outline" size="sm" color={"blue.100"} fontWeight={"bold"}>
              1 $
            </Button>
            <Button variant="outline" size="sm" color={"blue.100"} fontWeight={"bold"}>
              5 $
            </Button>
            <Button variant="outline" size="sm" color={"blue.100"} fontWeight={"bold"}>
              10 $
            </Button>
            <Button variant="outline" size="sm" color={"blue.100"} fontWeight={"bold"}>
              ALL IN
            </Button>
          </Flex>
          </VStack>
          <VStack borderWidth={1} gap={2} bgColor={"gray.900"} borderRadius={"md"} borderColor={"gray.700"} alignItems={"center"}>
          <Heading fontSize={"sm"} color="gray.100">Collect</Heading>
          <HStack borderWidth={1} gap={1} bgColor={"gray.700"} borderRadius={"full"} borderColor={"gray.900"} >
          <Button background={"gray.700"} variant={"solid"} rounded={"full"} w={9} h={9} iconSpacing={2}> {/* need to add on click*/}
            <MinusIcon color={"white"}/>
          </Button>
          {/* <Icon as={MinusIcon} color={"white"} borderRadius={"full"} background={"gray.800"} w={7} h={7} fontSize={10}/> */}
          <Input
            type={"number"}
            defaultValue="1.30"
            
            maxWidth={100}
            bg="gray.700"
            color="white"
            _placeholder={{ color: "gray.400" }}
            focusBorderColor="white"
            textAlign={"center"}
          ></Input>
          <Text color="gray.400" fontSize={"md"}>X</Text>
          <Button background={"gray.700"} variant={"solid"} rounded={"full"} w={9} h={9} iconSpacing={2}> {/* need to add on click*/}
            <AddIcon color={"white"} />
          </Button>
          
          </HStack>
          <Button
          w="full"
          size="sm"
          bg="yellow.500"
          _hover={{ bg: "yellow.600" }}
          color="black"
          fontWeight="semibold"
        >
          Place your bet
        </Button>
          </VStack>
         
        </Flex>
      </Stack>

      {/* RIGHT SIDE */}
      <Stack spacing={4}>
        {/* <Flex flexWrap="wrap" align="center" gap={2} direction={"row"}>
          <Input
            type="number"
            defaultValue="2.50"
            w="6rem"
            bg="slate.800"
            color="white"
            _placeholder={{ color: "gray.400" }}
          />
          <Text color="gray.400">x</Text>
          <Flex flexWrap="wrap" gap={2} mt={{ base: 2, sm: 0 }}>
            <Button variant="outline" size="sm">
              1x
            </Button>
            <Button variant="outline" size="sm">
              2x
            </Button>
            <Button variant="outline" size="sm">
              5x
            </Button>
            <Button variant="outline" size="sm">
              MAX
            </Button>
          </Flex>
        </Flex>
        <Button
          w="full"
          bg="yellow.500"
          _hover={{ bg: "yellow.600" }}
          color="black"
          fontWeight="semibold"
        >
          Place your bet
        </Button> */}

<Flex flexWrap="wrap" align="center" gap={2} borderTop="1px solid" borderColor={"yellow.400"} borderWidth={2} alignItems="stretch" bgColor={"gray.900"}>
          <VStack borderWidth={1} gap={2} bgColor={"gray.900"} borderRadius={"md"} borderColor={"gray.700"} alignItems={"center"} >
          <Heading fontSize={"sm"} color="gray.100">Bet</Heading>
          <HStack borderWidth={1} gap={1} bgColor={"gray.700"} borderRadius={"full"} borderColor={"gray.900"}>
          <Button background={"gray.700"} variant={"solid"} rounded={"full"} w={9} h={9} iconSpacing={2}> {/* need to add on click*/}
            <MinusIcon color={"white"}/>
          </Button>
          {/* <Icon as={MinusIcon} color={"white"} borderRadius={"full"} background={"gray.800"} w={7} h={7} fontSize={10}/> */}
          <Input
            type="number"
            defaultValue="1.00"
            w={100}
            bg="gray.700"
            color="white"
            _placeholder={{ color: "gray.400" }}
            focusBorderColor="white"
            textAlign={"center"}
            fontWeight={"bold"}
          ></Input>
          <Text color="gray.400" fontSize={"md"} fontWeight={"bold"}>USD</Text>
          <Button background={"gray.700"} variant={"solid"} rounded={"full"} w={9} h={9} iconSpacing={2}> {/* need to add on click*/}
            <AddIcon color={"white"} />
          </Button>
          </HStack>
          <Flex flexWrap="wrap" gap={2} mt={{ base: 2, sm: 0 }} borderTop="1px solid" borderColor={"yellow.400"} borderWidth={2} direction={"row"}>
            <Button variant="outline" size="sm" color={"blue.100"} fontWeight={"bold"}>
              1 $
            </Button>
            <Button variant="outline" size="sm" color={"blue.100"} fontWeight={"bold"}>
              5 $
            </Button>
            <Button variant="outline" size="sm" color={"blue.100"} fontWeight={"bold"}>
              10 $
            </Button>
            <Button variant="outline" size="sm" color={"blue.100"} fontWeight={"bold"}>
              ALL IN
            </Button>
          </Flex>
          </VStack>
          <VStack borderWidth={1} gap={2} bgColor={"gray.900"} borderRadius={"md"} borderColor={"gray.700"} alignItems={"center"}>
          <Heading fontSize={"sm"} color="gray.100">Collect</Heading>
          <HStack borderWidth={1} gap={1} bgColor={"gray.700"} borderRadius={"full"} borderColor={"gray.900"} >
          <Button background={"gray.700"} variant={"solid"} rounded={"full"} w={9} h={9} iconSpacing={2}> {/* need to add on click*/}
            <MinusIcon color={"white"}/>
          </Button>
          {/* <Icon as={MinusIcon} color={"white"} borderRadius={"full"} background={"gray.800"} w={7} h={7} fontSize={10}/> */}
          <Input
            type={"number"}
            defaultValue="1.30"
            
            maxWidth={100}
            bg="gray.700"
            color="white"
            _placeholder={{ color: "gray.400" }}
            focusBorderColor="white"
            textAlign={"center"}
          ></Input>
          <Text color="gray.400" fontSize={"md"}>X</Text>
          <Button background={"gray.700"} variant={"solid"} rounded={"full"} w={9} h={9} iconSpacing={2}> {/* need to add on click*/}
            <AddIcon color={"white"} />
          </Button>
          
          </HStack>
          <Button
          w="full"
          size="sm"
          bg="yellow.500"
          _hover={{ bg: "yellow.600" }}
          color="black"
          fontWeight="semibold"
        >
          Place your bet
        </Button>
          </VStack>
         
        </Flex>
      </Stack>
    </Grid>
  );
};

export default BettingControls;


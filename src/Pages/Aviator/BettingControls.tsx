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
import { useOrientation } from "../../hooks/useOrientation";

const BettingControls = () => {
    const isMobileWidth = useBreakpointValue({ base: true, sm: true, md: false , lg: false, xl: false});
    const isMobileWidthName = useBreakpointValue({ base: "base", sm: "small", md: "md" , lg: "large", xl: "xl"});

    const isPortrait = useOrientation() === 'portrait';
    const isMobile = isMobileWidth && isPortrait;
  console.log("betting controls : " + isMobileWidthName);
  return (
    <Grid
      // templateColumns={isMobile ? "1fr" : "1fr 1fr"}
      templateColumns={{ base: "1fr", sm: "1fr", md: "1fr" , lg: "1fr 1fr", xl: "1fr 1fr"}}
      // gap={isMobile ? "2" : "4"}
      gap={{ base: 1, sm: 2, md: 2 , lg: 3, xl: 4}}
      bg={"slateblue"}
      // p={isMobile ? "2" : "4"}
      paddingY={{ base: 1, sm: 2, md: 2 , lg: 3, xl: 4}}
      paddingX={{ base: 1, sm: 2, md: 0 , lg: 3, xl: 4}}
      borderTop="1px solid"
      borderColor={"yellow.400"}
      borderWidth={2}
      backdropFilter="blur(8px)"
      alignContent={'center'}
      alignSelf={'center'}
      alignItems={'center'}

    >
      {/* LEFT SIDE */}
      <Stack spacing={4} >
        <Flex flex={1} align="center" alignSelf={"center"} alignContent={"center"} position={"relative"} gap={2} borderTop="1px solid" borderColor={"yellow.400"} borderWidth={2} alignItems='center' bgColor={"gray.900"}>
          <VStack borderWidth={1} gap={2} bgColor={"gray.900"} borderRadius={"md"} borderColor={"gray.700"} alignItems={"center"} >
          <Heading fontSize={{ base: "xs", sm: "sm", md: "md" , lg: "md", xl: "md"}} color="gray.100">Bet</Heading>
          <HStack flex={1} borderWidth={1} gap={1} bgColor={"gray.700"} borderRadius={"full"} borderColor={"gray.900"}>
          <Button background={"gray.700"} variant={"solid"} rounded={"full"} size={{ base: "xs", sm: "sm", md: "sm" , lg: "md", xl: "md"}} iconSpacing={2}> {/* need to add on click*/}
            <MinusIcon color={"white"}/>
          </Button>
          {/* <Icon as={MinusIcon} color={"white"} borderRadius={"full"} background={"gray.800"} w={7} h={7} fontSize={10}/> */}
          <Input
            type="number"
            defaultValue="1.00"
            // w={100}
            // w={{ base: "16", sm: "16", md: "100" , lg: "100", xl: "100"}}
            w={{ base: 75, sm: 75, md: 100 , lg: 100, xl: 100}}
            bg="gray.700"
            color="white"
            _placeholder={{ color: "gray.400" }}
            focusBorderColor="white"
            textAlign={"center"}
            fontSize={{ base: "xs", sm: "md", md: "md" , lg: "md", xl: "md"}}
            fontWeight={"bold"}
          ></Input>
          <Text color="gray.400" fontSize={{ base: "xs", sm: "sm", md: "md" , lg: "md", xl: "md"}} fontWeight={"bold"}>USD</Text>
          <Button background={"gray.700"} variant={"solid"} rounded={"full"} size={{ base: "xs", sm: "sm", md: "sm" , lg: "md", xl: "md"}} iconSpacing={2}> {/* need to add on click*/}
            <AddIcon color={"white"} />
          </Button>
          </HStack>
          <Flex gap={{ base: 1, sm: 1, md: 2 , lg: 2, xl: 2}} mt={{ base: 0, sm: 2, md: 2 , lg: 2, xl: 2}} borderTop="1px solid" borderColor={"yellow.400"} borderWidth={0} direction={"row"} paddingBottom={1} alignContent={'center'}>
            <Button variant="outline" size={{ base: "xs", sm: "sm", md: "md" , lg: "md", xl: "md"}} color={"blue.100"} fontWeight={"bold"} fontSize={{ base: "xs", sm: "sm", md: "sm" , lg: "sm", xl: "sm"}}>
              1 $
            </Button>
            <Button variant="outline" size={{ base: "xs", sm: "sm", md: "md" , lg: "md", xl: "md"}} color={"blue.100"} fontWeight={"bold"} fontSize={{ base: "xs", sm: "sm", md: "sm" , lg: "sm", xl: "sm"}}>
              5 $
            </Button>
            <Button variant="outline" size={{ base: "xs", sm: "sm", md: "md" , lg: "md", xl: "md"}} color={"blue.100"} fontWeight={"bold"} fontSize={{ base: "xs", sm: "sm", md: "sm" , lg: "sm", xl: "sm"}}>
              10 $
            </Button>
            <Button variant="outline" size={{ base: "xs", sm: "sm", md: "md" , lg: "md", xl: "md"}} color={"blue.100"} fontWeight={"bold"} fontSize={{ base: "xs", sm: "sm", md: "sm" , lg: "sm", xl: "sm"}}>
              ALL IN
            </Button>
          </Flex>
          </VStack>

          <VStack borderWidth={1} gap={2} bgColor={"gray.900"} borderRadius={"md"} borderColor={"gray.700"} alignItems={"center"} alignContent={'center'} alignSelf={'center'} h={'full'}>
          <Heading fontSize={{ base: "xs", sm: "sm", md: "md" , lg: "md", xl: "md"}} color="gray.100">Collect</Heading>
          <HStack borderWidth={1} gap={1} bgColor={"gray.700"} borderRadius={"full"} borderColor={"gray.900"} >
          <Button background={"gray.700"} variant={"solid"} rounded={"full"} size={{ base: "xs", sm: "sm", md: "md" , lg: "md", xl: "md"}} iconSpacing={2}> {/* need to add on click*/}
            <MinusIcon color={"white"}/>
          </Button>
          {/* <Icon as={MinusIcon} color={"white"} borderRadius={"full"} background={"gray.800"} w={7} h={7} fontSize={10}/> */}
          <Input
            type={"number"}
            defaultValue="1.30"
            w={{ base: 75, sm: 75, md: 100 , lg: 100, xl: 100}}
            maxWidth={100}
            bg="gray.700"
            color="white"
            _placeholder={{ color: "gray.400" }}
            focusBorderColor="white"
            fontSize={{ base: "xs", sm: "md", md: "md" , lg: "md", xl: "lg"}}
            textAlign={"center"}
          ></Input>
          <Text color="gray.400" fontSize={{ base: "xs", sm: "sm", md: "md" , lg: "md", xl: "md"}}>X</Text>
          <Button background={"gray.700"} variant={"solid"} rounded={"full"} size={{ base: "xs", sm: "sm", md: "md" , lg: "md", xl: "md"}} iconSpacing={2}> {/* need to add on click*/}
            <AddIcon color={"white"} />
          </Button>
          
          </HStack>
          <Button
          w="full"
          size={{ base: "xs", sm: "sm", md: "md" , lg: "md", xl: "md"}}
          bg="yellow.500"
          _hover={{ bg: "yellow.600" }}
          color="black"
          fontSize={{ base: "xs", sm: "sm", md: "md" , lg: "lg", xl: "lg"}}
          fontWeight="semibold"
          // margin={0}
        >
          Place your bet
        </Button>
          </VStack>
         
        </Flex>
      </Stack>

      {/* RIGHT SIDE */}
      <Stack spacing={4} >
        <Flex flex={1} align="center" alignSelf={"center"} alignContent={"center"} position={"relative"} gap={2} borderTop="1px solid" borderColor={"yellow.400"} borderWidth={2} alignItems='center' bgColor={"gray.900"}>
          <VStack borderWidth={1} gap={2} bgColor={"gray.900"} borderRadius={"md"} borderColor={"gray.700"} alignItems={"center"} >
          <Heading fontSize={{ base: "xs", sm: "sm", md: "md" , lg: "md", xl: "md"}} color="gray.100">Bet</Heading>
          <HStack flex={1} borderWidth={1} gap={1} bgColor={"gray.700"} borderRadius={"full"} borderColor={"gray.900"}>
          <Button background={"gray.700"} variant={"solid"} rounded={"full"} size={{ base: "xs", sm: "sm", md: "sm" , lg: "md", xl: "md"}} iconSpacing={2}> {/* need to add on click*/}
            <MinusIcon color={"white"}/>
          </Button>
          {/* <Icon as={MinusIcon} color={"white"} borderRadius={"full"} background={"gray.800"} w={7} h={7} fontSize={10}/> */}
          <Input
            type="number"
            defaultValue="1.00"
            // w={100}
            // w={{ base: "16", sm: "16", md: "100" , lg: "100", xl: "100"}}
            w={{ base: 75, sm: 75, md: 100 , lg: 100, xl: 100}}
            bg="gray.700"
            color="white"
            _placeholder={{ color: "gray.400" }}
            focusBorderColor="white"
            textAlign={"center"}
            fontSize={{ base: "xs", sm: "md", md: "md" , lg: "md", xl: "lg"}}
            fontWeight={"bold"}
          ></Input>
          <Text color="gray.400" fontSize={{ base: "xs", sm: "sm", md: "md" , lg: "md", xl: "md"}} fontWeight={"bold"}>USD</Text>
          <Button background={"gray.700"} variant={"solid"} rounded={"full"} size={{ base: "xs", sm: "sm", md: "sm" , lg: "md", xl: "md"}} iconSpacing={2}> {/* need to add on click*/}
            <AddIcon color={"white"} />
          </Button>
          </HStack>
          <Flex gap={{ base: 1, sm: 1, md: 2 , lg: 2, xl: 2}} mt={{ base: 0, sm: 2, md: 2 , lg: 2, xl: 2}} borderTop="1px solid" borderColor={"yellow.400"} borderWidth={0} direction={"row"} paddingBottom={1} alignContent={'center'}>
            <Button variant="outline" size={{ base: "xs", sm: "sm", md: "md" , lg: "md", xl: "md"}} color={"blue.100"} fontWeight={"bold"} fontSize={{ base: "xs", sm: "sm", md: "sm" , lg: "sm", xl: "sm"}}>
              1 $
            </Button>
            <Button variant="outline" size={{ base: "xs", sm: "sm", md: "md" , lg: "md", xl: "md"}} color={"blue.100"} fontWeight={"bold"} fontSize={{ base: "xs", sm: "sm", md: "sm" , lg: "sm", xl: "sm"}}>
              5 $
            </Button>
            <Button variant="outline" size={{ base: "xs", sm: "sm", md: "md" , lg: "md", xl: "md"}} color={"blue.100"} fontWeight={"bold"} fontSize={{ base: "xs", sm: "sm", md: "sm" , lg: "sm", xl: "sm"}}>
              10 $
            </Button>
            <Button variant="outline" size={{ base: "xs", sm: "sm", md: "md" , lg: "md", xl: "md"}} color={"blue.100"} fontWeight={"bold"} fontSize={{ base: "xs", sm: "sm", md: "sm" , lg: "sm", xl: "sm"}}>
              ALL IN
            </Button>
          </Flex>
          </VStack>

          <VStack borderWidth={1} gap={2} bgColor={"gray.900"} borderRadius={"md"} borderColor={"gray.700"} alignItems={"center"} alignContent={'center'} alignSelf={'center'} h={'full'}>
          <Heading fontSize={{ base: "xs", sm: "sm", md: "md" , lg: "md", xl: "md"}} color="gray.100">Collect</Heading>
          <HStack borderWidth={1} gap={1} bgColor={"gray.700"} borderRadius={"full"} borderColor={"gray.900"} >
          <Button background={"gray.700"} variant={"solid"} rounded={"full"} size={{ base: "xs", sm: "sm", md: "md" , lg: "md", xl: "md"}} iconSpacing={2}> {/* need to add on click*/}
            <MinusIcon color={"white"}/>
          </Button>
          {/* <Icon as={MinusIcon} color={"white"} borderRadius={"full"} background={"gray.800"} w={7} h={7} fontSize={10}/> */}
          <Input
            type={"number"}
            defaultValue="1.30"
            w={{ base: 75, sm: 75, md: 100 , lg: 100, xl: 100}}
            maxWidth={100}
            bg="gray.700"
            color="white"
            _placeholder={{ color: "gray.400" }}
            focusBorderColor="white"
            fontSize={{ base: "xs", sm: "md", md: "md" , lg: "md", xl: "lg"}}
            textAlign={"center"}
          ></Input>
          <Text color="gray.400" fontSize={{ base: "xs", sm: "sm", md: "md" , lg: "md", xl: "md"}}>X</Text>
          <Button background={"gray.700"} variant={"solid"} rounded={"full"} size={{ base: "xs", sm: "sm", md: "md" , lg: "md", xl: "md"}} iconSpacing={2}> {/* need to add on click*/}
            <AddIcon color={"white"} />
          </Button>
          
          </HStack>
          <Button
          w="full"
          size={{ base: "xs", sm: "sm", md: "md" , lg: "md", xl: "md"}}
          bg="yellow.500"
          _hover={{ bg: "yellow.600" }}
          color="black"
          fontSize={{ base: "xs", sm: "sm", md: "md" , lg: "lg", xl: "xl"}}
          fontWeight="semibold"
          // margin={0}
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


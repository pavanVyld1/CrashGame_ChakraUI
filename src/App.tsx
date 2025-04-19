import * as React from "react"
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  useColorModeValue,
  Container,
  Heading,
  Stack
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"
import HomePage from "./Pages/Aviator/HomePage"
import CrashGameUI from "./Pages/Aviator/CrashGameUI"
import MriyaGameUI from "./Pages/MriyaGameUI"

export const App = () => (
  // <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH={200} >
        {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
        <Stack direction={"column"} spacing={30}>
          {/* <Logo h={40} pointerEvents="none" />
          <Text>
            Edit <Code fontSize="xl">src/App.tsx</Code> and save to reload.
          </Text> */}
          {/* <Link
            color="teal.500"
            href="https://chakra-ui.com"
            fontSize="2xl"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn Chakra
          </Link> */}
          <HomePage/>
        </Stack>
      </Grid>
    </Box>
  // </ChakraProvider>

    // <Box minH="100vh" color="inherit" mb={16}>
    //   {/* Header */}
    //   <Box as="header" py={4} boxShadow="md">
    //     <Container maxW="container.xl">
    //       <Heading
    //         as="h1"
    //         fontSize={["2xl", "3xl"]}
    //         fontWeight="bold"
    //         color={"white"}
    //       >
    //         Train Crash Adventure
    //       </Heading>
    //     </Container>
    //   </Box>

    //   {/* Main */}
    //   <Box as="main" py={6}>
    //     <Container maxW="container.xl">
    //       {/* <CrashGameUI /> */}
    //       <HomePage/>
    //     </Container>
    //   </Box>

    //   {/* Footer */}
    //   <Box as="footer" py={4} mt={8}>
    //     <Container maxW="container.xl" textAlign="center" fontSize="sm" color="gray.400">
    //       <Text>© 2025 Train Crash Adventure. For entertainment purposes only.</Text>
    //       <Heading
    //         fontSize={["5xl", "5xl"]}
    //         fontWeight="hairline"
    //         color="green.50"
    //         mt={4}
    //       >
    //         End of the Page
    //       </Heading>
    //     </Container>
    //   </Box>
    // </Box>
)

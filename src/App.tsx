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
import CrashGameUI from "./Pages/Aviator/CrashGameUI"
import MriyaGameUI from "./Pages/MriyaGameUI"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './Pages/Auth/AuthPage';
import HomePage from "./Pages/Aviator/HomePage"
import AuthPagerUpdated from "./Pages/Auth/AuthPageUpdated"


// export const App = () => (
//   // <ChakraProvider theme={theme}>
//     <Box textAlign="center" fontSize="xl">
//       <Grid minH={200} >
//         {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
//         <Stack direction={"column"} spacing={30}>
//           {/* <Logo h={40} pointerEvents="none" />
//           <Text>
//             Edit <Code fontSize="xl">src/App.tsx</Code> and save to reload.
//           </Text> */}
//           {/* <Link
//             color="teal.500"
//             href="https://chakra-ui.com"
//             fontSize="2xl"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn Chakra
//           </Link> */}
//           <HomePage/>
//         </Stack>
//       </Grid>
//     </Box>
// )

export const App = () => (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPagerUpdated />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
);


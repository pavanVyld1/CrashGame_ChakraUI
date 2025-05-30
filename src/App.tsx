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
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import AuthPage from './Pages/Auth/AuthPage';
import HomePage from "./Pages/Aviator/HomePage"
import AuthPagerUpdated from "./Pages/Auth/AuthPageUpdated"

export const App = () => (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPagerUpdated />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
);


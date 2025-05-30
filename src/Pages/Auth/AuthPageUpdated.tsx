// src/pages/AuthPage.tsx
import {
  Box, Button, Flex, FormControl, FormLabel, Heading, Input,
  Stack, useColorModeValue, useToast
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import ApiService from '../../services/ApiService';
import { RegisterData , LoginData } from '../../services/ApiService';
import { useNavigate } from 'react-router-dom';
import { LABELS } from '../../types/projectTypes';
import socketService from '../../services/socketService';
import { Console } from 'console';
import SocketManager from '../Managers/SocketManager';
import DataService, { PlayerData }  from "../../services/dataService";

const AuthPagerUpdated: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState<LoginData>({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState<RegisterData>({ name: '', email: '', password: '' });
  const toast = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (isLogin) {
        setLoginForm({ ...loginForm, [name]: value });

    }
    else {
        setRegisterForm({ ...registerForm, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const loginResponse = isLogin
        ? await ApiService.login(loginForm)
        : await ApiService.register(registerForm);

      // Save profile and token
      localStorage.setItem('token', loginResponse.data.token);
      localStorage.setItem('user', JSON.stringify(loginResponse.data.user));

      console.log("Login Response : " + JSON.stringify(loginResponse));
      const user = loginResponse.data.user;

//       console.log("Player Data Fields:");
//       console.log("ID:", user._id);
//       console.log("Name:", user.name);
// console.log("Email:", user.email);
// console.log("Wallet:", user.wallet);  

      const playerData: PlayerData = {
        id: user._id,
        name: user.name,
        email: user.email,
        wallet: user.wallet ?? 0
      };
      console.log("Login Response : Player Data " + JSON.stringify(playerData));
      DataService.setPlayerData(playerData);

      console.log("Login Success : " + loginResponse.data.token);
      toast({
        title: isLogin ? 'Login successful' : 'Registration successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/home');
      // TODO: Redirect or update auth context
    } catch (err: any) {
      toast({
        title: 'Authentication failed',
        description: err?.response?.message || 'Something went wrong',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
        console.log("Auth Page Loaded : Disconnect the socket");
        SocketManager.disconnect();
      // window.addEventListener("resize", updateDimensions);
      return () => {
        // window.removeEventListener("resize", updateDimensions);
      }
    },[]);


  return (
    <Flex minH="100vh" align="center" justify="center" bg={useColorModeValue("gray.50", "gray.800")}>
      <Box
        rounded="lg"
        bg={useColorModeValue("white", "gray.700")}
        boxShadow="lg"
        p={8}
        maxW="md"
        w="full"
      >
        <Stack spacing={4} mb={4}>
          <Heading fontSize="2xl" textAlign="center">
            {isLogin ? LABELS.SIGN_IN_HEADER : LABELS.SIGN_UP_HEADER}
          </Heading>
          <Flex justify="center">
            <Button variant={isLogin ? "solid" : "ghost"} onClick={() => setIsLogin(true)} mr={2}>
              {LABELS.LOGIN}
            </Button>
            <Button variant={!isLogin ? "solid" : "ghost"} onClick={() => setIsLogin(false)}>
              {LABELS.REGISTER}
            </Button>
          </Flex>
        </Stack>

        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            {!isLogin && (
              <FormControl id="name" isRequired>
                <FormLabel>{LABELS.NAME}</FormLabel>
                <Input type="text" name="name" value={registerForm.name} onChange={handleChange} />
              </FormControl>
            )}

            <FormControl id="email" isRequired>
              <FormLabel>{LABELS.EMAIL}</FormLabel>
              <Input
                type="email"
                name="email"
                value={isLogin ? loginForm.email : registerForm.email}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>{LABELS.PASSWORD}</FormLabel>
              <Input
                type="password"
                name="password"
                value={isLogin ? loginForm.password : registerForm.password}
                onChange={handleChange}
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              isLoading={loading}
              width="full"
            >
              {isLogin ? LABELS.LOGIN : LABELS.REGISTER}
            </Button>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};

export default AuthPagerUpdated;

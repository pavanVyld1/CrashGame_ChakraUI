// src/pages/AuthPage.tsx
import {
  Box, Button, Flex, FormControl, FormLabel, Heading, Input,
  Stack, useColorModeValue, useToast
} from '@chakra-ui/react';
import React, { useState } from 'react';
import ApiService from '../../services/ApiService';
import { RegisterData , LoginData } from '../../services/ApiService';
import { useNavigate } from 'react-router-dom';
import { LABELS } from '../../types/projectTypes';

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
      const data = isLogin
        ? await ApiService.login(loginForm)
        : await ApiService.register(registerForm);

      // Save profile and token
      localStorage.setItem('token', data.data.token);
      localStorage.setItem('user', JSON.stringify(data.data.user));

      console.log("Login Success : " + data.data.token);
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

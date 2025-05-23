// src/pages/AuthPage.tsx
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface LoginForm {
  email: string;
  password: string;
}

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginForm, setLoginForm] = useState<LoginForm>({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState<RegisterForm>({ name: "", email: "", password: "" });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login data:", loginForm);
    // TODO: Call login API here
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register data:", registerForm);
    // TODO: Call register API here
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
            {isLogin ? "Sign in to your account" : "Create an account"}
          </Heading>
          <Flex justify="center">
            <Button
              variant={isLogin ? "solid" : "ghost"}
              onClick={() => setIsLogin(true)}
              mr={2}
            >
              Login
            </Button>
            <Button
              variant={!isLogin ? "solid" : "ghost"}
              onClick={() => setIsLogin(false)}
            >
              Register
            </Button>
          </Flex>
        </Stack>

        <form onSubmit={isLogin ? handleLoginSubmit : handleRegisterSubmit}>
          <Stack spacing={4}>
            {!isLogin && (
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={registerForm.name}
                  onChange={handleRegisterChange}
                />
              </FormControl>
            )}

            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                value={isLogin ? loginForm.email : registerForm.email}
                onChange={isLogin ? handleLoginChange : handleRegisterChange}
              />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                name="password"
                value={isLogin ? loginForm.password : registerForm.password}
                onChange={isLogin ? handleLoginChange : handleRegisterChange}
              />
            </FormControl>

            <Button type="submit" colorScheme="blue" width="full">
              {isLogin ? "Login" : "Register"}
            </Button>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};

export default AuthPage;

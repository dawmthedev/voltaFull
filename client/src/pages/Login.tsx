import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  ScaleFade,
  Text,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../store";
import { login } from "../store/authSlice";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token, status } = useAppSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });

  useEffect(() => {
    if (token) navigate("/dashboard/projects", { replace: true });
  }, [token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await dispatch(login({ email, password })).unwrap();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const bg = useColorModeValue("blue.50", "gray.900");
  const panelBg = useColorModeValue("white", "gray.700");
  return (
    <Box className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-teal-500 to-cyan-600">
      {/* Simplified wave background */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-teal-500/30 to-cyan-600/30 backdrop-blur-xl">
        <div className="absolute inset-0 opacity-20">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className={`absolute bottom-0 left-0 right-0 h-[50vh] bg-white/10
                animate-wave-${i + 1} transform-gpu`}
              style={{
                animationDelay: `${i * 0.5}s`,
                bottom: `${i * -15}%`,
              }}
            />
          ))}
        </div>
      </div>

      <ScaleFade in={isOpen} initialScale={0.9}>
        <Box
          bg={panelBg}
          p={8}
          rounded="xl"
          shadow="2xl"
          className="w-full max-w-md backdrop-blur-xl bg-white/95 dark:bg-gray-800/95 
            border border-white/20 transform transition-all duration-300"
        >
          <div className="mb-8 text-center">
            <div className="inline-block p-4 mb-4">
              {/* Simple, professional logo placeholder */}
              <div
                className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg 
                flex items-center justify-center text-2xl font-bold text-white"
              >
                V
              </div>
            </div>
            <Heading
              mb={2}
              size="lg"
              className="text-gray-900 dark:text-white font-medium"
            >
              Welcome to Volta
            </Heading>
            <Text className="text-gray-600 dark:text-gray-400">
              Sign in to your account
            </Text>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <FormControl>
              <FormLabel className="text-gray-700 dark:text-gray-300">
                Email address
              </FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600
                  focus:border-teal-500 focus:ring-teal-500"
              />
            </FormControl>
            <FormControl>
              <FormLabel className="text-gray-700 dark:text-gray-300">
                Password
              </FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600
                  focus:border-teal-500 focus:ring-teal-500"
              />
            </FormControl>

            {error && (
              <Text color="red.300" fontSize="sm" className="animate-shake">
                {error}
              </Text>
            )}

            <Button
              type="submit"
              isLoading={status === "loading"}
              className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg
                transition-all duration-200 font-medium"
            >
              Sign In
            </Button>
          </form>

          <Text
            fontSize="sm"
            textAlign="center"
            mt={6}
            className="text-gray-600 dark:text-gray-400"
          >
            Don't have an account?{" "}
            <a
              href="#"
              className="text-teal-600 hover:text-teal-700 dark:text-teal-400 
              dark:hover:text-teal-300 font-medium"
            >
              Sign up
            </a>
          </Text>
        </Box>
      </ScaleFade>
    </Box>
  );
};

export default LoginPage;

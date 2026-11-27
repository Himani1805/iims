import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link as RouterLink, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to={isAdmin ? "/admin/dashboard" : "/"} replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const user = await login(form.email.trim(), form.password);
      toast({ title: "Login successful", status: "success", duration: 1800 });
      const redirect =
        location.state?.from || (user.role === "admin" ? "/admin/dashboard" : "/");
      navigate(redirect, { replace: true });
    } catch (error) {
      toast({
        title: error.response?.data?.message || "Login failed",
        status: "error",
        duration: 2500,
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Flex minH="70vh" align="center" justify="center" px={4}>
      <Box
        as="form"
        onSubmit={handleSubmit}
        w="100%"
        maxW="420px"
        bg="white"
        border="1px solid #dbe7f0"
        borderRadius="12px"
        p={6}
        boxShadow="sm"
      >
        <Heading size="md" color="#1B3A4B" mb={1}>
          Sign In
        </Heading>
        <Text fontSize="sm" color="gray.600" mb={5}>
          HS Academic Portal
        </Text>

        <FormControl mb={4} isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@email.com"
          />
        </FormControl>

        <FormControl mb={5} isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="••••••••"
          />
        </FormControl>

        <Button
          type="submit"
          w="100%"
          bg="#1B3A4B"
          color="white"
          _hover={{ bg: "#14303e" }}
          isLoading={submitting}
        >
          Login
        </Button>

        <Text mt={4} fontSize="sm" textAlign="center">
          New here?{" "}
          <Box as={RouterLink} to="/signup" color="#2A9D8F" fontWeight="600">
            Create account
          </Box>
        </Text>
      </Box>
    </Flex>
  );
}

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
import { Link as RouterLink, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { signup, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to={isAdmin ? "/admin/dashboard" : "/"} replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.password !== form.confirm) {
      toast({ title: "Passwords do not match", status: "warning", duration: 2200 });
      return;
    }
    setSubmitting(true);
    try {
      const user = await signup(form.name.trim(), form.email.trim(), form.password);
      toast({ title: "Account created", status: "success", duration: 1800 });
      navigate(user.role === "admin" ? "/admin/dashboard" : "/", { replace: true });
    } catch (error) {
      toast({
        title: error.response?.data?.message || "Signup failed",
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
          Create Account
        </Heading>
        <Text fontSize="sm" color="gray.600" mb={5}>
          First account becomes admin automatically
        </Text>

        <FormControl mb={3} isRequired>
          <FormLabel>Full name</FormLabel>
          <Input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Himani Sharma"
          />
        </FormControl>

        <FormControl mb={3} isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@email.com"
          />
        </FormControl>

        <FormControl mb={3} isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Min 6 characters"
          />
        </FormControl>

        <FormControl mb={5} isRequired>
          <FormLabel>Confirm password</FormLabel>
          <Input
            type="password"
            value={form.confirm}
            onChange={(e) => setForm({ ...form, confirm: e.target.value })}
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
          Sign Up
        </Button>

        <Text mt={4} fontSize="sm" textAlign="center">
          Already have an account?{" "}
          <Box as={RouterLink} to="/login" color="#2A9D8F" fontWeight="600">
            Login
          </Box>
        </Text>
      </Box>
    </Flex>
  );
}

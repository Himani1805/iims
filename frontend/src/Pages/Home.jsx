import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { isAuthenticated, isAdmin, user } = useAuth();

  return (
    <Flex
      minH="60vh"
      align="center"
      justify="center"
      px={4}
      direction="column"
      textAlign="center"
      gap={4}
    >
      <Heading color="#1B3A4B">HS Academic Portal</Heading>
      <Text color="gray.600" maxW="520px">
        Personal campus suite for academics and administration.
        {user ? ` Signed in as ${user.name} (${user.role}).` : " Please login to continue."}
      </Text>

      {!isAuthenticated && (
        <Flex gap={3}>
          <Button as={RouterLink} to="/login" bg="#1B3A4B" color="white">
            Login
          </Button>
          <Button as={RouterLink} to="/signup" variant="outline" borderColor="#1B3A4B">
            Sign Up
          </Button>
        </Flex>
      )}

      {isAuthenticated && isAdmin && (
        <Button as={RouterLink} to="/admin/dashboard" bg="#1B3A4B" color="white">
          Open Admin Panel
        </Button>
      )}

      {isAuthenticated && !isAdmin && (
        <Box bg="#FFF5F5" border="1px solid #FED7D7" borderRadius="8px" p={4} maxW="480px">
          <Text color="#9B2C2C">
            Your account is not an admin. Ask an admin to upgrade your role for panel access.
          </Text>
        </Box>
      )}
    </Flex>
  );
}

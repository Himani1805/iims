import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <Flex
      width={"100%"}
      justifyContent={"space-between"}
      alignItems={"center"}
      minHeight={"70px"}
      borderBottom={"2px solid #1B3A4B"}
      mb={"24px"}
      overflow={"hidden"}
      bg={"white"}
    >
      <Flex
        as={RouterLink}
        to={isAdmin ? "/admin/dashboard" : "/"}
        backgroundColor={"#1B3A4B"}
        alignItems={"center"}
        gap={"12px"}
        px={"14px"}
        py={"8px"}
        height={"70px"}
        flexShrink={0}
        _hover={{ textDecoration: "none" }}
      >
        <Image
          src="/images/hs-logo.jpg"
          height={"48px"}
          width={"48px"}
          borderRadius={"10px"}
          objectFit={"cover"}
          alt="HS Academic Portal"
        />
        <Box color={"white"} lineHeight={"1.15"}>
          <Text fontSize={"15px"} fontWeight={"700"}>
            HS Academic
          </Text>
          <Text fontSize={"11px"} opacity={0.85}>
            Personal Campus Suite
          </Text>
        </Box>
      </Flex>

      <Box
        as={RouterLink}
        to={isAdmin ? "/admin/dashboard" : "/"}
        fontSize={{ base: "16px", md: "26px" }}
        fontWeight={"700"}
        color={"#1B3A4B"}
        whiteSpace={"nowrap"}
        px={"12px"}
        textAlign={"center"}
        flex={"1"}
        _hover={{ textDecoration: "none", color: "#14303e" }}
      >
        HS Academic Portal
      </Box>

      <Flex
        alignItems={"center"}
        gap={"10px"}
        px={"12px"}
        borderLeft="3px double #2A9D8F"
        borderLeftRadius={"20px"}
        flexShrink={0}
        height={"70px"}
      >
        {isAuthenticated ? (
          <>
            <Image
              src="/images/hs-logo.jpg"
              width={"36px"}
              height={"36px"}
              borderRadius={"full"}
              objectFit={"cover"}
              alt="Profile"
            />
            <Box>
              <Text fontSize={"16px"} lineHeight={"1.2"} fontWeight={"600"}>
                {user?.name || "User"}
              </Text>
              <Text fontSize={"12px"} color={"gray.600"}>
                {user?.role === "admin" ? "Admin" : "User"} - HS Academic Portal
              </Text>
            </Box>
            {isAdmin && (
              <>
                <Button as={RouterLink} to="/admin/users" size="sm" variant="ghost">
                  Users
                </Button>
                <Button as={RouterLink} to="/admin/master-data" size="sm" variant="ghost">
                  Master Data
                </Button>
              </>
            )}
            <Button size="sm" variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Flex gap={2}>
            <Button as={RouterLink} to="/login" size="sm" variant="ghost">
              Login
            </Button>
            <Button
              as={RouterLink}
              to="/signup"
              size="sm"
              bg="#1B3A4B"
              color="white"
              _hover={{ bg: "#14303e" }}
            >
              Sign Up
            </Button>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}

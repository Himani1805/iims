import { Box, Flex } from "@chakra-ui/react";
import React from "react";

export default function Welcome() {
  return (
    <Flex
      height={"400px"}
      bg={"#123123"}
      color={"white"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      Welcome Page
    </Flex>
  );
}

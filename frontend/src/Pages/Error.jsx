import { Flex, Heading } from "@chakra-ui/react";
import React from "react";

export default function Error() {
  return (
    <Flex height={"512px"} justifyContent={"center"} alignItems={"center"}>
      <Heading fontWeight={"Bolder"} color={"blue.300"}>
        404 Page Not Found
      </Heading>
    </Flex>
  );
}

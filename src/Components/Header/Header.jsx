import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

export default function Header() {
  return (
    <Flex
      width={"100%"}
      justifyContent={"space-between"}
      height={"70px"}
      border={"1px solid red"}
      mb={"40px"}
    >
      <Flex backgroundColor={"#23394C"} alignItems={"center"}>
        <Image
          src="https://cdn0.iconfinder.com/data/icons/ui-essential-filled-line-1/32/menu-bar-navigation-dropdown-128.png"
          width={"30px"}
          height={"30px"}
          color={"white"}
        ></Image>
        <Image
          src="/images/shardalogo_white.png"
          height={"fit-content"}
        ></Image>
      </Flex>
      <Box fontSize={"36px"}>Sharda Academic Portal</Box>
      <Flex
        alignItems={"center"}
        gap={"10px"}
        px={"10px"}
        borderLeft={"1px solid #bbb"}
      >
        <Box>
          <Image
            src="https://cdn4.iconfinder.com/data/icons/linecon/512/photo-128.png"
            width={"35px"}
          ></Image>
        </Box>
        <Box>
          <Text fontSize={"16px"}>Himani Sharma</Text>
          <Text fontSize={"12px"}>Role - Senior Executive Assistant</Text>
        </Box>
      </Flex>
    </Flex>
  );
}

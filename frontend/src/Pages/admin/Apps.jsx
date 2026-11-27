import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export default function Apps({ data, count = 0 }) {
  const endPoint = data.endPoint;
  return (
    <Link to={`/admin/dashboard/${endPoint}`} style={{ textDecoration: "none" }}>
      <Flex
        width={"100px"}
        minHeight={"118px"}
        flexDirection={"column"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
        boxShadow={
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
        }
        backgroundColor={"white"}
        padding={"10px 7px"}
        borderRadius={"5px"}
        position="relative"
      >
        {count > 0 && (
          <Box
            position="absolute"
            top="4px"
            right="6px"
            bg="#1B3A4B"
            color="white"
            fontSize="10px"
            px="6px"
            py="1px"
            borderRadius="999px"
            minW="18px"
            textAlign="center"
          >
            {count}
          </Box>
        )}
        <Flex height={"50%"} alignItems={"center"} justifyContent={"center"}>
          <Image src={data.image} width={"28px"} height={"28px"} objectFit={"contain"} alt="" />
        </Flex>
        <Flex height={"50%"} alignItems="center">
          <Text fontSize={"12px"} color={"gray"} textAlign="center">
            {data.title}
          </Text>
        </Flex>
      </Flex>
    </Link>
  );
}

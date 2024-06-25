import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { academic } from "../../assets/js/Academic";
import { admin } from "../../assets/js/Admin";
import { Link } from "react-router-dom";

export default function Apps({ data }) {
  let endPoint = data.endPoint;
  return (
    <Link to={`${endPoint}`} style={{ textDecoration: "none" }}>
      <Flex
        width={"90px"}
        height={"110px"}
        flexDirection={"column"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
        boxShadow={
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
        }
        backgroundColor={"white"}
        padding={"10px 7px"}
        borderRadius={"5px"}
      >
        <Flex height={"50%"}>
          <Image src={data.image} width={"20px"} height={"20px"} />
        </Flex>
        <Flex height={"50%"}>
          <Text fontSize={"12px"} color={"gray"}>
            {data.title}
          </Text>
        </Flex>
      </Flex>
    </Link>
  );
}

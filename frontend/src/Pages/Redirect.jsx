import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import ModuleWorkspace from "../Components/ModuleWorkspace";
import { moduleConfig } from "../assets/js/modules.js";

export default function Redirect() {
  const { name } = useParams();

  if (!name || !moduleConfig[name]) {
    return (
      <Flex justifyContent={"center"} py={16}>
        <Text fontSize={"20px"}>Module not found</Text>
      </Flex>
    );
  }

  return <ModuleWorkspace moduleKey={name} />;
}

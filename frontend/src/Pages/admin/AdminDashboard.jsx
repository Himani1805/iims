import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { academic } from "../../assets/js/Academic";
import { admin } from "../../assets/js/Admin";
import { getRecordsSummary } from "../../services/recordsApi";
import Apps from "./Apps";

export default function AdminDashboard() {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    let alive = true;
    async function load() {
      try {
        const data = await getRecordsSummary();
        if (alive) setCounts(data.counts || {});
      } catch {
        if (alive) setCounts({});
      }
    }
    load();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <Box backgroundColor={"#E9F6FF"} padding={"20px"}>
      <Box>
        <Text fontSize={"20px"} fontWeight={"600"} color={"#1B3A4B"}>
          Academics
        </Text>
        <Flex flexWrap={"wrap"} gap={"10px"} textAlign={"center"}>
          {academic.map((ele, i) => (
            <Apps key={i} data={ele} count={counts?.[ele.endPoint] || 0} />
          ))}
        </Flex>
      </Box>

      <Box>
        <Text fontSize={"20px"} fontWeight={"600"} color={"#1B3A4B"} mt={"16px"}>
          Administration
        </Text>
        <Flex flexWrap={"wrap"} gap={"10px"} textAlign={"center"}>
          {admin.map((ele, i) => (
            <Apps key={i} data={ele} count={counts?.[ele.endPoint] || 0} />
          ))}
        </Flex>
      </Box>
    </Box>
  );
}

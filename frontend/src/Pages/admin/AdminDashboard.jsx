import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { academic } from "../../assets/js/Academic";
import { admin } from "../../assets/js/Admin";
import { getRecordsSummary } from "../../services/recordsApi";
import Apps from "./Apps";

export default function AdminDashboard() {
  const [counts, setCounts] = useState({});
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let alive = true;
    async function load() {
      try {
        const data = await getRecordsSummary();
        if (alive) {
          setCounts(data.counts || {});
          setTotal(data.total || 0);
        }
      } catch {
        if (alive) {
          setCounts({});
          setTotal(0);
        }
      }
    }
    load();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <Box backgroundColor={"#E9F6FF"} padding={"20px"}>
      <Flex justify="space-between" align="center" mb={3} gap={3} flexWrap="wrap">
        <Box>
          <Text fontSize={"20px"} fontWeight={"700"} color={"#1B3A4B"}>
            Admin Dashboard
          </Text>
          <Text fontSize="sm" color="gray.600">
            {total} total saved records across modules
          </Text>
        </Box>
        <Flex gap={2} flexWrap="wrap">
          <Button as={RouterLink} to="/admin/master-data" size="sm" variant="outline" borderColor="#1B3A4B">
            Master Data
          </Button>
          <Button as={RouterLink} to="/admin/users" size="sm" bg="#1B3A4B" color="white" _hover={{ bg: "#14303e" }}>
            Users & Roles
          </Button>
        </Flex>
      </Flex>

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

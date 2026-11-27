import {
  Badge,
  Box,
  Button,
  Flex,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { listUsers, updateUserRole } from "../../services/usersApi";

export default function Users() {
  const toast = useToast();
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState("");

  async function refresh() {
    setLoading(true);
    try {
      const rows = await listUsers();
      setUsers(rows);
    } catch (error) {
      toast({
        title: error.response?.data?.message || "Failed to load users",
        status: "error",
        duration: 2500,
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function handleRoleChange(id, role) {
    setSavingId(id);
    try {
      const updated = await updateUserRole(id, role);
      setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
      toast({ title: "Role updated", status: "success", duration: 1600 });
    } catch (error) {
      toast({
        title: error.response?.data?.message || "Failed to update role",
        status: "error",
        duration: 2500,
      });
    } finally {
      setSavingId("");
    }
  }

  return (
    <Box px={{ base: 3, md: 6 }} pb={10}>
      <Flex justify="space-between" align="center" mb={5} gap={3} flexWrap="wrap">
        <Box>
          <Text fontSize={{ base: "20px", md: "26px" }} fontWeight="700" color="#1B3A4B">
            Users & Roles
          </Text>
          <Text fontSize="sm" color="gray.600">
            Promote or demote accounts. At least one admin is always required.
          </Text>
        </Box>
        <Button as={RouterLink} to="/admin/dashboard" variant="outline" borderColor="#1B3A4B">
          Back to Dashboard
        </Button>
      </Flex>

      <Box bg="white" border="1px solid #e2e8f0" borderRadius="10px" overflowX="auto">
        {loading ? (
          <Text px={4} py={6} color="gray.500">
            Loading users...
          </Text>
        ) : users.length === 0 ? (
          <Text px={4} py={6} color="gray.500">
            No users found.
          </Text>
        ) : (
          <Table size="sm">
            <Thead bg="#f7fafc">
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Joined</Th>
                <Th>Change role</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((u) => {
                const isSelf = String(u.id) === String(currentUser?.id);
                return (
                  <Tr key={u.id}>
                    <Td fontWeight="600">
                      {u.name}{" "}
                      {isSelf && (
                        <Badge ml={2} colorScheme="teal">
                          You
                        </Badge>
                      )}
                    </Td>
                    <Td>{u.email}</Td>
                    <Td>
                      <Badge colorScheme={u.role === "admin" ? "purple" : "gray"}>
                        {u.role}
                      </Badge>
                    </Td>
                    <Td>{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "-"}</Td>
                    <Td minW="160px">
                      <Select
                        size="sm"
                        value={u.role}
                        isDisabled={savingId === u.id || isSelf}
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      >
                        <option value="admin">admin</option>
                        <option value="user">user</option>
                      </Select>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        )}
      </Box>
    </Box>
  );
}

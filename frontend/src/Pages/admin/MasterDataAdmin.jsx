import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
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
import React, { useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useMasterData } from "../../context/MasterDataContext";
import {
  createMasterData,
  deleteMasterData,
  updateMasterData,
} from "../../services/masterDataApi";

const TYPES = [
  "Institution",
  "School",
  "Department",
  "AcademicYear",
  "ProgrammeType",
  "Programme",
  "Semester",
  "Section",
];

export default function MasterDataAdmin() {
  const toast = useToast();
  const { items, refresh } = useMasterData();
  const [type, setType] = useState("Institution");
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState("");
  const [saving, setSaving] = useState(false);

  const rows = useMemo(() => items[type] || [], [items, type]);

  async function handleSave() {
    if (!name.trim()) {
      toast({ title: "Name is required", status: "warning", duration: 1800 });
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        await updateMasterData(editingId, { name: name.trim() });
        toast({ title: "Updated", status: "success", duration: 1500 });
      } else {
        await createMasterData({ type, name: name.trim() });
        toast({ title: "Created", status: "success", duration: 1500 });
      }
      setName("");
      setEditingId("");
      await refresh();
    } catch (error) {
      toast({
        title: error.response?.data?.message || "Save failed",
        status: "error",
        duration: 2500,
      });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteMasterData(id);
      if (editingId === id) {
        setEditingId("");
        setName("");
      }
      await refresh();
      toast({ title: "Deactivated", status: "info", duration: 1500 });
    } catch (error) {
      toast({
        title: error.response?.data?.message || "Delete failed",
        status: "error",
        duration: 2500,
      });
    }
  }

  return (
    <Box px={{ base: 3, md: 6 }} pb={10}>
      <Flex justify="space-between" align="center" mb={5} gap={3} flexWrap="wrap">
        <Box>
          <Text fontSize={{ base: "20px", md: "26px" }} fontWeight="700" color="#1B3A4B">
            Master Data
          </Text>
          <Text fontSize="sm" color="gray.600">
            Manage Institution, School, Programme and other shared dropdown values.
          </Text>
        </Box>
        <Button as={RouterLink} to="/admin/dashboard" variant="outline" borderColor="#1B3A4B">
          Back to Dashboard
        </Button>
      </Flex>

      <Box
        bg="#E9F6FF"
        border="1px solid #cfe4f3"
        borderRadius="10px"
        p={{ base: 3, md: 5 }}
        mb={6}
      >
        <Flex flexWrap="wrap" gap={4} align="end">
          <FormControl width={{ base: "100%", md: "220px" }}>
            <FormLabel mb={1}>Type</FormLabel>
            <Select
              bg="white"
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                setEditingId("");
                setName("");
              }}
            >
              {TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl width={{ base: "100%", md: "320px" }}>
            <FormLabel mb={1}>{editingId ? "Edit name" : "New name"}</FormLabel>
            <Input
              bg="white"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={`Enter ${type} name`}
            />
          </FormControl>
          <Button
            bg="#1B3A4B"
            color="white"
            _hover={{ bg: "#14303e" }}
            onClick={handleSave}
            isLoading={saving}
          >
            {editingId ? "Update" : "Add"}
          </Button>
          {editingId && (
            <Button
              variant="outline"
              onClick={() => {
                setEditingId("");
                setName("");
              }}
            >
              Cancel
            </Button>
          )}
        </Flex>
      </Box>

      <Box bg="white" border="1px solid #e2e8f0" borderRadius="10px" overflowX="auto">
        <Text px={4} py={3} fontWeight="600">
          {type} ({rows.length})
        </Text>
        {rows.length === 0 ? (
          <Text px={4} pb={4} color="gray.500">
            No values yet for this type.
          </Text>
        ) : (
          <Table size="sm">
            <Thead bg="#f7fafc">
              <Tr>
                <Th>Name</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {rows.map((row) => (
                <Tr key={row.id}>
                  <Td>{row.name}</Td>
                  <Td>
                    <Flex gap={2}>
                      <Button
                        size="xs"
                        onClick={() => {
                          setEditingId(row.id);
                          setName(row.name);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="xs"
                        colorScheme="red"
                        variant="outline"
                        onClick={() => handleDelete(row.id)}
                      >
                        Deactivate
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
    </Box>
  );
}

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
  Textarea,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  AcademicYear,
  Department,
  Institution,
  Programme,
  ProgrammeType,
  School,
  Section,
  Semester,
} from "../assets/js/data/Commondata/commonData.js";
import { ACADEMIC_FIELD_KEYS, getModuleConfig } from "../assets/js/modules.js";
import {
  createRecord,
  deleteRecord,
  listRecords,
  updateRecord,
} from "../services/recordsApi.js";

const academicOptions = {
  Institution: { data: Institution, field: "name" },
  School: { data: School, field: "name" },
  Department: { data: Department, field: "name" },
  AcademicYear: { data: AcademicYear, field: "year" },
  ProgrammeType: { data: ProgrammeType, field: "name" },
  Programme: { data: Programme, field: "name" },
  Semester: { data: Semester, field: "name" },
  Section: { data: Section, field: "name" },
};

function emptyForm(config) {
  const form = {};
  if (config.academicFields) {
    ACADEMIC_FIELD_KEYS.forEach((key) => {
      form[key] = "";
    });
  }
  config.fields.forEach((field) => {
    form[field.key] = "";
  });
  return form;
}

export default function ModuleWorkspace({ moduleKey }) {
  const toast = useToast();
  const config = useMemo(() => getModuleConfig(moduleKey), [moduleKey]);
  const [form, setForm] = useState(() => emptyForm(config));
  const [records, setRecords] = useState([]);
  const [editingId, setEditingId] = useState(null);

  async function refresh() {
    try {
      const rows = await listRecords(moduleKey);
      setRecords(rows);
    } catch (error) {
      toast({
        title: error.response?.data?.message || "Failed to load records",
        status: "error",
        duration: 2500,
      });
    }
  }

  useEffect(() => {
    setForm(emptyForm(config));
    setEditingId(null);
    refresh();
  }, [moduleKey]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleReset() {
    setForm(emptyForm(config));
    setEditingId(null);
  }

  async function handleSave() {
    const required = config.academicFields
      ? ["Institution", "School", "Department"]
      : config.fields.slice(0, 1).map((f) => f.key);

    const missing = required.find((key) => !String(form[key] || "").trim());
    if (missing) {
      toast({
        title: `Please fill ${missing}`,
        status: "warning",
        duration: 2200,
        isClosable: true,
      });
      return;
    }

    try {
      if (editingId) {
        await updateRecord(moduleKey, editingId, form);
        toast({ title: "Record updated", status: "success", duration: 1800 });
      } else {
        await createRecord(moduleKey, form);
        toast({ title: "Record saved", status: "success", duration: 1800 });
      }
      handleReset();
      await refresh();
    } catch (error) {
      toast({
        title: error.response?.data?.message || "Save failed",
        status: "error",
        duration: 2500,
      });
    }
  }

  function handleEdit(record) {
    const next = emptyForm(config);
    Object.keys(next).forEach((key) => {
      next[key] = record[key] || "";
    });
    setForm(next);
    setEditingId(record.id);
  }

  async function handleDelete(id) {
    try {
      await deleteRecord(moduleKey, id);
      if (editingId === id) handleReset();
      await refresh();
      toast({ title: "Record deleted", status: "info", duration: 1600 });
    } catch (error) {
      toast({
        title: error.response?.data?.message || "Delete failed",
        status: "error",
        duration: 2500,
      });
    }
  }

  const columns = [
    ...(config.academicFields ? ["Institution", "School", "Department", "Programme"] : []),
    ...config.fields.map((f) => f.key),
  ].slice(0, 6);

  return (
    <Box px={{ base: 3, md: 6 }} pb={10}>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        mb={5}
        gap={3}
        flexWrap={"wrap"}
      >
        <Text fontSize={{ base: "20px", md: "26px" }} fontWeight={"700"} color={"#1B3A4B"}>
          {config.title}
        </Text>
        <Button as={RouterLink} to="/admin/dashboard" variant={"outline"} borderColor={"#1B3A4B"}>
          Back to Dashboard
        </Button>
      </Flex>

      <Box
        bg={"#E9F6FF"}
        borderRadius={"10px"}
        p={{ base: 3, md: 5 }}
        mb={6}
        border={"1px solid #cfe4f3"}
      >
        <Text fontWeight={"600"} mb={4}>
          {editingId ? "Edit record" : "Add new record"}
        </Text>
        <Flex flexWrap={"wrap"} gap={4}>
          {config.academicFields &&
            ACADEMIC_FIELD_KEYS.map((key) => {
              const meta = academicOptions[key];
              return (
                <FormControl key={key} width={{ base: "100%", md: "280px" }}>
                  <FormLabel mb={1}>{key.replace(/([A-Z])/g, " $1").trim()}</FormLabel>
                  <Select
                    name={key}
                    value={form[key]}
                    onChange={handleChange}
                    bg={"white"}
                    placeholder={`Select ${key}`}
                  >
                    {meta.data.map((item) => (
                      <option key={item.id} value={item[meta.field]}>
                        {item[meta.field]}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              );
            })}

          {config.fields.map((field) => (
            <FormControl
              key={field.key}
              width={{
                base: "100%",
                md: field.type === "textarea" ? "100%" : "280px",
              }}
            >
              <FormLabel mb={1}>{field.label}</FormLabel>
              {field.type === "textarea" ? (
                <Textarea
                  name={field.key}
                  value={form[field.key]}
                  onChange={handleChange}
                  bg={"white"}
                  rows={3}
                />
              ) : (
                <Input
                  type={field.type === "date" ? "date" : "text"}
                  name={field.key}
                  value={form[field.key]}
                  onChange={handleChange}
                  bg={"white"}
                />
              )}
            </FormControl>
          ))}
        </Flex>

        <Flex gap={3} mt={5}>
          <Button bg={"#1B3A4B"} color={"white"} _hover={{ bg: "#14303e" }} onClick={handleSave}>
            {editingId ? "Update" : "Save"}
          </Button>
          <Button variant={"outline"} onClick={handleReset}>
            Reset
          </Button>
        </Flex>
      </Box>

      <Box
        bg={"white"}
        borderRadius={"10px"}
        border={"1px solid #e2e8f0"}
        overflowX={"auto"}
      >
        <Flex justifyContent={"space-between"} alignItems={"center"} px={4} py={3}>
          <Text fontWeight={"600"}>Saved records ({records.length})</Text>
        </Flex>
        {records.length === 0 ? (
          <Text px={4} pb={4} color={"gray.500"}>
            No records yet. Fill the form and click Save.
          </Text>
        ) : (
          <Table size={"sm"}>
            <Thead bg={"#f7fafc"}>
              <Tr>
                {columns.map((col) => (
                  <Th key={col}>{col}</Th>
                ))}
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {records.map((record) => (
                <Tr key={record.id}>
                  {columns.map((col) => (
                    <Td key={col} maxW={"180px"} isTruncated>
                      {record[col] || "-"}
                    </Td>
                  ))}
                  <Td>
                    <Flex gap={2}>
                      <Button size={"xs"} onClick={() => handleEdit(record)}>
                        Edit
                      </Button>
                      <Button
                        size={"xs"}
                        colorScheme={"red"}
                        variant={"outline"}
                        onClick={() => handleDelete(record.id)}
                      >
                        Delete
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

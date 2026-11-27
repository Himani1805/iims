import { Box, Button, Text } from "@chakra-ui/react";
import React, { useState } from "react";

export default function DataStore() {
  const [formData, setFormData] = useState({
    Institution: "",
    School: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Box
      fontFamily={"Arial, sans-serif"}
      maxWidth={"600px"}
      margin={"0px auto"}
      padding={"20px"}
      border={"1px solid #ccc"}
      borderRadius={"10px"}
    >
      <Text textAlign={"center"}>Prepare Time Table</Text>
      <form onSubmit={handleSubmit}>
        <Box>
          <label>Institution</label>
          <select name="Institution" onChange={handleChange} value={formData.Institution}>
            <option value="">Select Institution</option>
            <option value="Himani Institute of Management Studies">
              Himani Institute of Management Studies
            </option>
          </select>
        </Box>
        <Box>
          <label>School</label>
          <select name="School" onChange={handleChange} value={formData.School}>
            <option value="">Select School</option>
            <option value="School of Business & Management">
              School of Business & Management
            </option>
          </select>
        </Box>
        <Button type="submit">Search Version</Button>
        <Button
          onClick={() =>
            setFormData({
              Institution: "",
              School: "",
            })
          }
        >
          Reset
        </Button>
      </form>
    </Box>
  );
}

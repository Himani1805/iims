import { Box, Select } from "@chakra-ui/react";
import React from "react";
import { School } from "../../assets/js/data/Commondata/school.js";
export default function ComboBox({ data, size, width }) {
  data = School;
  size = "lg";
  width = "20%";
  return (
    <Box>
      <Select placeholder="Select option" size={"lg"} width={width}>
        {
          data?.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          })
          //
        }
      </Select>
    </Box>
  );
}

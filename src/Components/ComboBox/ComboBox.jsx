import { Box, Select } from "@chakra-ui/react";
import React from "react";
import { School } from "../../assets/js/data/Commondata/school.js";
export default function ComboBox({ data, width }) {
  // data = School;
  // width = "20%";
  return (
    <Box>
      <Select placeholder="Select option" size={"lg"} width={width}>
        {
          data?.map((item) => {
            return (
              <option key={item.id} value={item.name}>
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

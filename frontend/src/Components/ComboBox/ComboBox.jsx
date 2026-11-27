import { Box, Select } from "@chakra-ui/react";
import React from "react";
import { School } from "../../assets/js/data/Commondata/school.js";
export default function ComboBox({ name, value, data, fieldName, optionName, width, selectChange }) {
  // data = School;
  // width = "20%";
  return (
    <Box>
      <Select name={name} value={value} placeholder={`Select ${optionName}`} onChange={selectChange} size={"lg"} width={width} >
        {
          data?.map((item) => {
            return (
              <option key={item.id} value={item[fieldName]}>
                {item[fieldName]}
              </option>
            );
          })
        }
      </Select>
    </Box>
  );
}

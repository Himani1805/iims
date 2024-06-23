import { Box, Button } from "@chakra-ui/react";
import React from "react";

export default function ButtonSubmit({
  text,
  onSave,
  pad,
  color,
  bg,
  bgHover = "none",
  radius = "none",
}) {
  return (
    <Box>
      <Button
        onClick={onSave}
        p={pad}
        color={color}
        bg={bg}
        borderRadius={radius}
        _hover={{ bg: bgHover }}
      >
        {text}
      </Button>
    </Box>
  );
}

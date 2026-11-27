import { Box, Button } from "@chakra-ui/react";
import React from "react";

export default function ButtonReset({ text, onReset, style }) {
  return (
    <Box>
      <Button
        onClick={onReset}
        p={style?.padding}
        color={style?.color}
        bg={style?.bg}
        border={style?.border}
        borderRadius={style?.radius}
        _hover={{ bg: style?.bgHover, color: style?.colorHover }}
      >
        {text}
      </Button>
    </Box>
  );
}

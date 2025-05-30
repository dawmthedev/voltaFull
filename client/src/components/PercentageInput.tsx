import React from "react";
import {
  Input,
  InputGroup,
  InputRightAddon,
  Alert,
  AlertIcon,
  Box,
} from "@chakra-ui/react";

interface PercentageInputProps {
  value: number | "";
  onChange: (value: number | "") => void;
  max?: number;
  isDisabled?: boolean;
  showWarning?: boolean;
}

const PercentageInput: React.FC<PercentageInputProps> = ({
  value,
  onChange,
  max = 100,
  isDisabled = false,
  showWarning = true,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    if (rawValue === "") {
      onChange("");
      return;
    }

    // Remove leading zeros
    const cleanValue = rawValue.replace(/^0+(?=\d)/, "");
    const numValue = Number(cleanValue);
    // Validate number and constrain to 2 decimal places
    if (!isNaN(numValue) && numValue >= 0) {
      const roundedValue = Math.round(numValue * 100) / 100;
      onChange(roundedValue > max ? max : roundedValue);
    }
  };

  const isOverMax = typeof value === "number" && value > max;

  // Format display value to remove leading zeros
  const displayValue = value === "" ? "" : Number(value).toString();

  return (
    <Box>
      <InputGroup w="120px">
        <Input
          type="number"
          value={displayValue}
          onChange={handleChange}
          isDisabled={isDisabled}
          min={0}
          max={max}
          step="0.01"
          isInvalid={isOverMax}
          onWheel={(e) => e.currentTarget.blur()}
        />
        <InputRightAddon children="%" />
      </InputGroup>
      {showWarning && isOverMax && (
        <Alert status="warning" mt={2} size="sm">
          <AlertIcon />
          Cannot exceed {max}%
        </Alert>
      )}
    </Box>
  );
};

export default PercentageInput;

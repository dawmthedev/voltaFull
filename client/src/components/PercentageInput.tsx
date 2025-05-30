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
  value: number | null;
  onChange: (value: number | null) => void;
  max?: number;
  isDisabled?: boolean;
  showWarning?: boolean;
  remainingPercent?: number;
  className?: string; // Add this line
}

export const PercentageInput: React.FC<PercentageInputProps> = ({
  value,
  onChange,
  max = 100,
  isDisabled = false,
  showWarning = true,
  remainingPercent,
  className, // Add this
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    if (rawValue === "") {
      onChange(null);
      return;
    }

    let numValue = Math.min(Number(rawValue), max);
    if (isNaN(numValue) || numValue < 0) {
      numValue = 0;
    }

    if (remainingPercent != null) {
      numValue = Math.min(numValue, remainingPercent);
    }

    onChange(numValue);
  };

  const isOverMax = value != null && value > (remainingPercent ?? max);

  return (
    <Box className={className}>
      <InputGroup w="120px">
        <Input
          type="number"
          value={value ?? ""}
          onChange={handleChange}
          isDisabled={isDisabled}
          min={0}
          max={remainingPercent ?? max}
          step="0.1"
          isInvalid={isOverMax}
        />
        <InputRightAddon>%</InputRightAddon>
      </InputGroup>
      {showWarning && isOverMax && (
        <Alert status="warning" mt={2} size="sm">
          <AlertIcon />
          Cannot exceed {remainingPercent ?? max}%
        </Alert>
      )}
    </Box>
  );
};

export default PercentageInput;

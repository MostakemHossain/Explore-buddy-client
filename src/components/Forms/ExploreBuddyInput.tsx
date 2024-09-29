import { SxProps, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
type TInputProps = {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  fullWidth?: boolean;
  required: boolean;
  size?: "small" | "medium";
  sx?: SxProps;
};

const ExploreBuddyInput = ({
  name,
  fullWidth,
  label,
  size = "small",
  type = "text",
  sx,
  placeholder,
  required,
}: TInputProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          {...field}
          sx={{
            ...sx,
          }}
          variant="outlined"
          required
          label={label}
          size={size}
          type={type}
          placeholder={label}
          fullWidth={fullWidth}
        />
      )}
    />
  );
};

export default ExploreBuddyInput;

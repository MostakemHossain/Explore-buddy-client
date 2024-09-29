import { SxProps } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Controller, useFormContext } from "react-hook-form";

interface IDatePicker {
  name: string;
  size?: "small" | "medium";
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  sx?: SxProps;
  onChange: (value: any) => void;
  value?: string;
}

const ExploreBuddyDatePicker = ({
  name,
  size = "small",
  label,
  required,
  fullWidth = true,
  sx,
  onChange,
  value,
}: IDatePicker) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({ field }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label={label}
            timezone="system"
            disablePast
            {...field}
            onChange={(date) => {
              field.onChange(date);
              onChange(date);
            }}
            value={field.value || null}
            slotProps={{
              textField: {
                required: required,
                size: size,
                sx: {
                  ...sx,
                },
                variant: "outlined",
                fullWidth: fullWidth,
              },
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
};

export default ExploreBuddyDatePicker;

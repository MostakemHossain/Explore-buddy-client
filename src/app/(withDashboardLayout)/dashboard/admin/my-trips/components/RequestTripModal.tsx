import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import React from "react";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: () => void;
};

const RequestTripModal = ({ open, setOpen, onConfirm }: TProps) => {
  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          outline: "none",
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          color={"primary.main"}
          fontWeight={600}
          align="center"
        >
          Request Trip
        </Typography>
        <Typography fontWeight={600} sx={{ mt: 2 }} align="center">
          Do you want to request this trip?
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          sx={{ mt: 4 }}
          justifyContent="center"
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirm}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
              px: 4,
            }}
          >
            Yes
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClose}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderRadius: 2,
              px: 4,
            }}
          >
            No
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default RequestTripModal;

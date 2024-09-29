import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import React from "react";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: () => void;
};

const DeleteTeamModal = ({ open, setOpen, onConfirm }: TProps) => {
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
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2" fontWeight={600}>
          Confirm Delete
        </Typography>
        <Typography fontWeight={600} sx={{ mt: 2 }}>
          Are you sure you want to delete this Employee?
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
          <Button variant="contained" color="primary" onClick={handleConfirm}>
            Yes, Delete
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default DeleteTeamModal;

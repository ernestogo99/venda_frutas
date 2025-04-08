import React from "react";
import { IdeleteDialog } from "../../interfaces/DeleteDialog";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";

export const DeleteMessage: React.FC<IdeleteDialog> = ({
  Onclose,
  show,
  tittle,
  handleDelete,
}) => {
  return (
    <Dialog
      aria-labelledby="alert-dialog-title"
      onClose={Onclose}
      fullWidth
      maxWidth="sm"
      open={show}
      sx={{
        "& .MuiDialog-paper": {
          border: "2px solid #fb923c",
          borderRadius: 3,
          boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
          padding: 2,
        },
      }}
    >
      <Box display="flex" justifyContent="flex-end">
        <IconButton onClick={Onclose}>
          <Close />
        </IconButton>
      </Box>

      <DialogTitle textAlign="center" id="alert-dialog-title">
        {tittle}
      </DialogTitle>

      <DialogActions sx={{ justifyContent: "center", paddingBottom: 2 }}>
        <Button
          variant="contained"
          color="error"
          sx={{ minWidth: 120 }}
          onClick={handleDelete}
        >
          Excluir
        </Button>
        <Button variant="outlined" onClick={Onclose} sx={{ minWidth: 120 }}>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

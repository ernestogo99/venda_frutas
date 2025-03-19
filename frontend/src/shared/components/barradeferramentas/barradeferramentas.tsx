import { Add } from "@mui/icons-material";
import { Box, Button, Paper, TextField, useTheme } from "@mui/material";
import React from "react";

interface Ibarradeferramentasprops {
  textodabusca?: string;
  mostrarinputbuscar?: boolean;
  aomudartextodebusca?: (novotexto: string) => void;
  textobotaonovo?: string;
  mostrarbotaonovo?: boolean;
  aoclicaremnovo?: () => void;
}

export const Ferramentasdalistagem: React.FC<Ibarradeferramentasprops> = ({
  textodabusca = "",
  mostrarinputbuscar = false,
  aomudartextodebusca,
  aoclicaremnovo,
  textobotaonovo = "novo",
  mostrarbotaonovo = true,
}) => {
  const theme = useTheme();

  return (
    <Box
      height={theme.spacing(5)}
      marginX={1}
      padding={1}
      paddingX={2}
      component={Paper}
      display="flex"
      gap={1}
      alignItems="center"
    >
      {mostrarinputbuscar && (
        <TextField
          value={textodabusca}
          onChange={(event) => aomudartextodebusca?.(event.target.value)}
          size="small"
          label="Pesquisar"
        ></TextField>
      )}

      <Box flex={1} display="flex" justifyContent="end">
        {mostrarbotaonovo && (
          <Button
            color="primary"
            variant="contained"
            disableElevation
            onClick={aoclicaremnovo}
            endIcon={<Add></Add>}
          >
            {textobotaonovo}
          </Button>
        )}
      </Box>
    </Box>
  );
};

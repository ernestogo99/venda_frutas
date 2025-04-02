import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  useTheme,
} from "@mui/material";
import React from "react";
import { authService } from "../../services/authservice";

interface Ibarradeferramentasprops {
  textodabusca?: string;
  mostrarinputbuscar?: boolean;
  aomudartextodebusca?: (novotexto: string) => void;

  textobotaonovo?: string;
  mostrarbotaonovo?: boolean;
  aoclicaremnovo?: () => void;

  mostrarbotaologout?: boolean;

  mostrarselectclassificacao?: boolean;
  classificacaoSelecionada?: string;
  aomudarclassificacao?: (novaClassificacao: string) => void;
}

export const Ferramentasdalistagem: React.FC<Ibarradeferramentasprops> = ({
  textodabusca = "",
  mostrarinputbuscar = false,
  aomudartextodebusca,
  aoclicaremnovo,
  textobotaonovo = "novo",
  mostrarbotaonovo = true,
  mostrarbotaologout = true,

  mostrarselectclassificacao = false,
  classificacaoSelecionada = "",
  aomudarclassificacao,
}) => {
  const theme = useTheme();

  const handleLogout = () => {
    authService.logout();
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    aomudarclassificacao?.(event.target.value);
  };

  return (
    <Box
      height={theme.spacing(5)}
      marginX={1}
      padding={1}
      paddingX={2}
      component={Paper}
      display="flex"
      gap={2}
      alignItems="center"
    >
      {mostrarinputbuscar && (
        <TextField
          value={textodabusca}
          onChange={(event) => aomudartextodebusca?.(event.target.value)}
          size="small"
          label="Pesquisar por nome"
        />
      )}

      {mostrarselectclassificacao && (
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Classificação</InputLabel>
          <Select
            value={classificacaoSelecionada}
            label="Classificação"
            onChange={handleSelectChange}
          >
            <MenuItem value="">Todas</MenuItem>
            <MenuItem value="e">Extra</MenuItem>
            <MenuItem value="p">De primeira</MenuItem>
            <MenuItem value="s">De segunda</MenuItem>
            <MenuItem value="t">De terceira</MenuItem>
          </Select>
        </FormControl>
      )}

      <Box flex={1} display="flex" justifyContent="end" gap={2}>
        {mostrarbotaonovo && (
          <Button
            color="primary"
            variant="contained"
            disableElevation
            onClick={aoclicaremnovo}
            endIcon={<Add />}
          >
            {textobotaonovo}
          </Button>
        )}
        {mostrarbotaologout && (
          <Button
            color="primary"
            variant="contained"
            disableElevation
            onClick={handleLogout}
          >
            Log Out
          </Button>
        )}
      </Box>
    </Box>
  );
};

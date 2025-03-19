import { Add, ArrowBack, Delete, Save } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Paper,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";

interface Iferramentasdedetalhe {
  textobotaonovo?: string;

  mostrarbotaonovo?: boolean;
  mostrarbotaovoltar?: boolean;
  mostrarbotaoapagar?: boolean;
  mostrarbotaosalvar?: boolean;
  mostrarbotaosalvarefechar?: boolean;

  mostrarbotaosalvarcarregando?: boolean;
  mostrarbotaonovocarregando?: boolean;
  mostrarbotaovoltarcarregando?: boolean;
  mostrarbotaoapagarcarregando?: boolean;
  mostrarbotaosalvarefecharcarregando?: boolean;

  aoclicaremnovo?: () => void;
  aoclicaremvoltar?: () => void;
  aoclicaremapagar?: () => void;
  aoclicaremsalvar?: () => void;
  aoclicaremsalvarefechar?: () => void;
}

export const Ferramentasdedetalhe: React.FC<Iferramentasdedetalhe> = ({
  textobotaonovo = "novo",

  mostrarbotaonovo = true,
  mostrarbotaovoltar = true,
  mostrarbotaoapagar = true,
  mostrarbotaosalvar = true,
  mostrarbotaosalvarefechar = false,

  mostrarbotaoapagarcarregando = false,
  mostrarbotaonovocarregando = false,
  mostrarbotaosalvarcarregando = false,
  mostrarbotaosalvarefecharcarregando = false,
  mostrarbotaovoltarcarregando = false,

  aoclicaremnovo,
  aoclicaremvoltar,
  aoclicaremapagar,
  aoclicaremsalvar,
  aoclicaremsalvarefechar,
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      marginX={1}
      padding={1}
      paddingX={2}
      component={Paper}
      height={theme.spacing(5)}
    >
      {mostrarbotaosalvar && !mostrarbotaosalvarcarregando && (
        <Button
          onClick={aoclicaremsalvar}
          color="primary"
          variant="contained"
          disableElevation
          startIcon={<Save></Save>}
        >
          <Typography variant="button" noWrap>
            Salvar
          </Typography>
        </Button>
      )}

      {mostrarbotaosalvarcarregando && (
        <Skeleton width={110} height={60}></Skeleton>
      )}

      {mostrarbotaosalvarefechar &&
        !mostrarbotaosalvarefecharcarregando &&
        !smDown &&
        !mdDown && (
          <Button
            onClick={aoclicaremsalvarefechar}
            color="primary"
            variant="outlined"
            disableElevation
            startIcon={<Save></Save>}
          >
            <Typography variant="button" noWrap>
              Salvar e Fechar
            </Typography>
          </Button>
        )}

      {mostrarbotaosalvarefecharcarregando && !mdDown && !smDown && (
        <Skeleton width={180} height={60}></Skeleton>
      )}

      {mostrarbotaoapagar && !mostrarbotaoapagarcarregando && (
        <Button
          onClick={aoclicaremapagar}
          color="primary"
          variant="outlined"
          disableElevation
          startIcon={<Delete></Delete>}
        >
          <Typography variant="button" noWrap>
            Apagar
          </Typography>
        </Button>
      )}

      {mostrarbotaoapagarcarregando && (
        <Skeleton width={110} height={60}></Skeleton>
      )}

      {mostrarbotaonovo && !mostrarbotaonovocarregando && !smDown && (
        <Button
          onClick={aoclicaremnovo}
          color="primary"
          variant="outlined"
          disableElevation
          startIcon={<Add></Add>}
        >
          <Typography variant="button" noWrap>
            {textobotaonovo}
          </Typography>
        </Button>
      )}

      {mostrarbotaonovocarregando && !smDown && (
        <Skeleton width={110} height={60}></Skeleton>
      )}

      {mostrarbotaovoltar && !mostrarbotaovoltarcarregando && (
        <>
          <Divider variant="middle" orientation="vertical"></Divider>
          <Button
            onClick={aoclicaremvoltar}
            color="primary"
            variant="outlined"
            disableElevation
            startIcon={<ArrowBack></ArrowBack>}
          >
            <Typography variant="button" noWrap>
              Voltar
            </Typography>
          </Button>
        </>
      )}

      {mostrarbotaovoltarcarregando && (
        <Skeleton width={110} height={60}></Skeleton>
      )}
    </Box>
  );
};

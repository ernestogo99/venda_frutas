import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { Layoutbasedepagina } from "../../shared/layout";
import { Ferramentasdalistagem, Menulateral } from "../../shared/components";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Delete, Edit } from "@mui/icons-material";

export const ListagemVendas: React.FC = () => {
  const [searchParans, setSearchparans] = useSearchParams();

  const [totalcount, setTotalcount] = useState(0);
  const [isloading, setloading] = useState(true);
  const [rows, setRows] = useState([
    { id: 1, nomeCompleto: "João Silva", email: "joao@email.com" },
    { id: 2, nomeCompleto: "Maria Souza", email: "maria@email.com" },
    { id: 3, nomeCompleto: "Carlos Pereira", email: "carlos@email.com" },
  ]);
  const navigate = useNavigate();
  const busca = useMemo(() => {
    return searchParans.get("busca") || "";
  }, [searchParans]);

  return (
    <Menulateral>
      <Layoutbasedepagina
        titulo="Relatório de vendas"
        barradeferramentas={
          <Ferramentasdalistagem
            mostrarinputbuscar
            mostrarbotaonovo={false}
            textodabusca={busca}
            aomudartextodebusca={(texto) =>
              setSearchparans({ busca: texto, pagina: "1" }, { replace: true })
            }
          />
        }
      >
        <TableContainer
          sx={{ margin: 1, width: "auto" }}
          component={Paper}
          variant="outlined"
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Frutas vendidas</TableCell>
                <TableCell>Quantidade</TableCell>
                <TableCell>Valor</TableCell>
                <TableCell>Horário</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <IconButton size="small">
                      <Delete />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        navigate(`/pessoas/detalhe/${row.id}`);
                      }}
                      size="small"
                    >
                      <Edit />
                    </IconButton>
                  </TableCell>
                  <TableCell>{row.nomeCompleto}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            {totalcount === 0 && !isloading && (
              <caption>Listagem vazia</caption>
            )}
          </Table>
        </TableContainer>
      </Layoutbasedepagina>
    </Menulateral>
  );
};

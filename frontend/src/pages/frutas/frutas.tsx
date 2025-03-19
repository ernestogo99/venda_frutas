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

export const Frutas: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalcount, setTotalcount] = useState(0);
  const [isLoading, setLoading] = useState(true);

  const [rows, setRows] = useState([
    {
      id: 1,
      nome: "Maçã",
      classificacao: "Extra",
      fresca: true,
      quantidade_disponivel: 50,
      valor_venda: 3.5,
    },
    {
      id: 2,
      nome: "Banana",
      classificacao: "De primeira",
      fresca: true,
      quantidade_disponivel: 100,
      valor_venda: 2.0,
    },
    {
      id: 3,
      nome: "Abacaxi",
      classificacao: "De segunda",
      fresca: false,
      quantidade_disponivel: 20,
      valor_venda: 5.0,
    },
    {
      id: 4,
      nome: "Laranja",
      classificacao: "De terceira",
      fresca: true,
      quantidade_disponivel: 75,
      valor_venda: 1.8,
    },
  ]);

  const navigate = useNavigate();
  const busca = useMemo(() => {
    return searchParams.get("busca") || "";
  }, [searchParams]);

  return (
    <Menulateral>
      <Layoutbasedepagina
        titulo="Frutas"
        barradeferramentas={
          <Ferramentasdalistagem
            aoclicaremnovo={() => navigate("/frutas/cadastro")}
            mostrarinputbuscar
            textodabusca={busca}
            aomudartextodebusca={(texto) =>
              setSearchParams({ busca: texto, pagina: "1" }, { replace: true })
            }
            textobotaonovo="Nova fruta"
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
                <TableCell>Ações</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Classificação</TableCell>
                <TableCell>Quantidade</TableCell>
                <TableCell>Fresca</TableCell>
                <TableCell>Valor de Venda (R$)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((fruta) => (
                <TableRow key={fruta.id}>
                  <TableCell>
                    <IconButton
                      onClick={() =>
                        console.log(`Excluir fruta ID: ${fruta.id}`)
                      }
                      size="small"
                    >
                      <Delete />
                    </IconButton>
                    <IconButton
                      onClick={() => navigate(`/frutas/detalhe/${fruta.id}`)}
                      size="small"
                    >
                      <Edit />
                    </IconButton>
                  </TableCell>
                  <TableCell>{fruta.nome}</TableCell>
                  <TableCell>{fruta.classificacao}</TableCell>
                  <TableCell>{fruta.quantidade_disponivel}</TableCell>
                  <TableCell>{fruta.fresca ? "Sim" : "Não"}</TableCell>
                  <TableCell>{fruta.valor_venda.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            {totalcount === 0 && !isLoading && (
              <caption>Listagem vazia</caption>
            )}
          </Table>
        </TableContainer>
      </Layoutbasedepagina>
    </Menulateral>
  );
};

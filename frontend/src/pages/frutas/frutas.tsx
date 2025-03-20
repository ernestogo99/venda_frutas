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
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Layoutbasedepagina } from "../../shared/layout";
import { Ferramentasdalistagem, Menulateral } from "../../shared/components";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Delete, Edit, Sell } from "@mui/icons-material";
import { Fruta } from "../../shared/interfaces/fruta";
import { FrutasService } from "../../shared/services/frutaservice";
import toast from "react-hot-toast";

export const Frutas: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [classificacaoSelecionada, setClassificacaoSelecionada] = useState("");

  const [isLoading, setLoading] = useState(true);
  const [rows, setRows] = useState<Fruta[]>([]);

  const navigate = useNavigate();

  const busca = useMemo(() => searchParams.get("busca") || "", [searchParams]);

  useEffect(() => {
    setLoading(true);
    FrutasService.getAllFrutas().then((response) => {
      setLoading(false);
      if (response instanceof Error) {
        toast.error(response.message);
      } else {
        setRows(response);
      }
    });
  }, []);

  const filteredRows = useMemo(() => {
    return rows.filter((fruta) => {
      const buscaMatch = fruta.nome.toLowerCase().includes(busca.toLowerCase());
      const classificacaoMatch =
        !classificacaoSelecionada ||
        fruta.classificacao === classificacaoSelecionada;

      return buscaMatch && classificacaoMatch;
    });
  }, [rows, busca, classificacaoSelecionada]);

  const handleDelete = useCallback((id: number) => {
    if (window.confirm("deseja excluir?")) {
      FrutasService.deleteFruta(id).then((response) => {
        if (response instanceof Error) {
          console.log(response);
          toast.error(response.message);
        } else {
          setRows((oldRows) => {
            return oldRows.filter((oldLisItem) => oldLisItem.id !== id);
          });
        }
      });
    }
  }, []);

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
            mostrarselectclassificacao
            classificacaoSelecionada={classificacaoSelecionada}
            aomudarclassificacao={setClassificacaoSelecionada}
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
              {filteredRows.map((fruta) => (
                <TableRow key={fruta.id}>
                  <TableCell>
                    <IconButton
                      onClick={() => handleDelete(fruta.id!)}
                      size="small"
                    >
                      <Delete />
                    </IconButton>
                    <IconButton
                      onClick={() => navigate(`/frutas/editar/${fruta.id}`)}
                      size="small"
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      onClick={() => navigate("/frutas/vendas")}
                      size="small"
                    >
                      <Sell />
                    </IconButton>
                  </TableCell>
                  <TableCell>{fruta.nome}</TableCell>
                  <TableCell>{fruta.classificacao}</TableCell>
                  <TableCell>{fruta.quantidade_disponivel}</TableCell>
                  <TableCell>{fruta.fresca ? "Sim" : "Não"}</TableCell>
                  <TableCell>
                    {fruta.valor_venda
                      ? Number(fruta.valor_venda).toFixed(2)
                      : "0.00"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            {filteredRows.length === 0 && !isLoading && (
              <caption>Listagem vazia</caption>
            )}
          </Table>
        </TableContainer>
      </Layoutbasedepagina>
    </Menulateral>
  );
};

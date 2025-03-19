import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Layoutbasedepagina } from "../../shared/layout";
import { Ferramentasdalistagem, Menulateral } from "../../shared/components";
import { useSearchParams } from "react-router-dom";
import { VendaService } from "../../shared/services/vendaservice";
import { RelatorioVenda } from "../../shared/interfaces/venda";
import toast from "react-hot-toast";

export const ListagemVendas: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [rows, setRows] = useState<RelatorioVenda[]>([]);

  const busca = searchParams.get("busca") || "";

  useEffect(() => {
    VendaService.getRelatorio().then((response) => {
      if (response instanceof Error) {
        toast.error(response.message);
        setRows([]);
      } else {
        console.log(response);
        setRows(response);
        setTotalCount(response.length);
      }
      setLoading(false);
    });
  }, []);

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
              setSearchParams({ busca: texto, pagina: "1" }, { replace: true })
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
                <TableCell>Frutas Vendidas</TableCell>
                <TableCell>Quantidade</TableCell>
                <TableCell>Valor</TableCell>
                <TableCell>Data</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.fruta_nome}</TableCell>
                  <TableCell>{row.quantidade}</TableCell>
                  <TableCell>{(Number(row.total) || 0).toFixed(2)}</TableCell>
                  <TableCell>
                    {new Date(row.data).toLocaleString()}
                  </TableCell>{" "}
                  {}
                </TableRow>
              ))}
            </TableBody>
            {totalCount === 0 && !isLoading && (
              <caption>Listagem vazia</caption>
            )}
          </Table>
        </TableContainer>
      </Layoutbasedepagina>
    </Menulateral>
  );
};

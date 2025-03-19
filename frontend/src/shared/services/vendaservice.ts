import { RelatorioVenda, VendaBody, VendaResponse } from "../interfaces/venda";
import { api } from "./axiosconfig/axiosconfig";

const getRelatorio = async (): Promise<RelatorioVenda[] | Error> => {
  try {
    const { data } = await api.get("/vendas/relatorio");
    if (data) {
      return data;
    }
    return new Error("Erro ao obter o relatorio");
  } catch (error) {
    console.error(error);
    return new Error("erro ao obter o relatorio ");
  }
};

const Vender = async (fruta: VendaBody): Promise<VendaResponse | Error> => {
  try {
    const { data } = await api.post("/vendas/", fruta);
    return data as VendaResponse;
  } catch (error) {
    console.error(error);
    return new Error("erro ao realizar a venda ");
  }
};

export const VendaService = {
  getRelatorio,
  Vender,
};

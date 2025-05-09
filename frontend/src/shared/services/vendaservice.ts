import { RelatorioVenda, VendaBody, VendaResponse } from "../interfaces/venda";
import { api } from "./axiosconfig/axiosconfig";

const getRelatorio = async (): Promise<RelatorioVenda[] | Error> => {
  try {
    const { data } = await api.get("/vendas/relatorio");
    if (data) {
      return data;
    }
    return new Error("Erro ao obter o relatorio");
  } catch (error: any) {
    console.error(error);

    const errorMessage =
      error.response?.data?.error || "Erro ao obter o relatorio";
    return new Error(errorMessage);
  }
};

const Vender = async (fruta: VendaBody): Promise<VendaResponse | Error> => {
  try {
    const { data } = await api.post("/vendas/", fruta);
    return data as VendaResponse;
  } catch (error: any) {
    console.error(error);

    const errorMessage =
      error.response?.data?.error || "Erro ao realizar a venda";
    return new Error(errorMessage);
  }
};

export const VendaService = {
  getRelatorio,
  Vender,
};

import { Fruta } from "../interfaces/fruta";
import { api } from "./axiosconfig/axiosconfig";

const getAllFrutas = async (): Promise<Fruta[] | Error> => {
  try {
    const { data } = await api.get("/frutas/disponiveis/");
    if (data) {
      return data;
    }
    return new Error("erro ao obter as frutas ");
  } catch (error: any) {
    console.error(error);

    const errorMessage =
      error.response?.data?.error || "Erro ao obter as  fruta";
    return new Error(errorMessage);
  }
};

const addFruta = async (fruta: Omit<Fruta, "id">): Promise<Fruta | Error> => {
  try {
    const { data } = await api.post("/frutas/", fruta);
    return data;
  } catch (error: any) {
    console.error(error);

    const errorMessage =
      error.response?.data?.error || "Erro ao adicionar a fruta";
    return new Error(errorMessage);
  }
};

const deleteFruta = async (id: number): Promise<any> => {
  try {
    const { data } = await api.delete(`/frutas/${id}`);
    return data;
  } catch (error: any) {
    console.error(error);

    const errorMessage =
      error.response?.data?.error || "Erro ao excluir a fruta";
    return new Error(errorMessage);
  }
};

const ediFruta = async (id: number, fruta: Fruta): Promise<Fruta | Error> => {
  try {
    const { data } = await api.put(`/frutas/${id}`, fruta);
    return data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.error || "Erro ao editar a fruta";
    return new Error(errorMessage);
  }
};

const getFrutaById = async (id: number): Promise<Fruta | Error> => {
  try {
    const { data } = await api.get(`/frutas/${id}`);
    if (data) {
      return data;
    }
    return new Error("Erro ao obter a fruta");
  } catch (error: any) {
    console.error(error);

    const errorMessage = error.response?.data?.error || "Erro ao obter a fruta";
    return new Error(errorMessage);
  }
};

export const FrutasService = {
  getAllFrutas,
  addFruta,
  deleteFruta,
  ediFruta,
  getFrutaById,
};

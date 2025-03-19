import { Fruta } from "../interfaces/fruta";
import { api } from "./axiosconfig/axiosconfig";

const getAllFrutas = async (): Promise<Fruta[] | Error> => {
  try {
    const { data } = await api.get("/frutas/disponiveis/");
    if (data) {
      return data;
    }
    return new Error("erro ao obter as frutas ");
  } catch (error) {
    console.error(error);
    return new Error("erro ao obter as frutas ");
  }
};

const addFruta = async (fruta: Omit<Fruta, "id">): Promise<Fruta | Error> => {
  try {
    const { data } = await api.post("/frutas/", fruta);
    return data;
  } catch (error) {
    console.error(error);
    return new Error("erro ao adicionar a  fruta");
  }
};

const deleteFruta = async (id: number): Promise<any> => {
  try {
    const { data } = await api.delete(`/frutas/${id}`);
    return data;
  } catch (error) {
    console.error(error);
    return new Error("erro ao excluir a fruta");
  }
};

const ediFruta = async (id: number, fruta: Fruta): Promise<Fruta | Error> => {
  try {
    const { data } = await api.put(`/frutas/${id}`, fruta);
    return data;
  } catch (error) {
    console.error(error);
    return new Error("erro ao atualizar a fruta");
  }
};

const getFrutaById = async (id: number): Promise<Fruta | Error> => {
  try {
    const { data } = await api.get(`/frutas/${id}`);
    if (data) {
      return data;
    }
    return new Error("Erro ao obter a fruta");
  } catch (error) {
    console.error(error);
    return new Error("erro ao obter a fruta");
  }
};

export const FrutasService = {
  getAllFrutas,
  addFruta,
  deleteFruta,
  ediFruta,
  getFrutaById,
};

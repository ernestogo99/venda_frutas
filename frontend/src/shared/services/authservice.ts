// src/services/authService.ts

import axios from "axios";
import { CreateUserPayload, UserData } from "../interfaces/user";
import { api } from "./axiosconfig/axiosconfig";

const API_URL = "http://127.0.0.1:8000/api/login/";

const signIn = async (username: string, password: string) => {
  try {
    const response = await axios.post(API_URL, {
      username,
      password,
    });

    const { access, refresh, user } = response.data;

    localStorage.setItem("access_token", access);
    sessionStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    sessionStorage.setItem("refresh_token", refresh);

    localStorage.setItem("user_data", JSON.stringify(user));
    sessionStorage.setItem("user_data", JSON.stringify(user));

    return { access, refresh, user };
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw new Error("Credenciais inválidas");
  }
};

const getUserData = (): UserData | null => {
  const userData =
    localStorage.getItem("user_data") || sessionStorage.getItem("user_data");
  return userData ? JSON.parse(userData) : null;
};

const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = "/login";
};

const createUser = async (
  userData: CreateUserPayload
): Promise<CreateUserPayload | Error> => {
  try {
    const { data } = await api.post("/users/", userData);
    return data;
  } catch (error) {
    console.error(error);
    return new Error("erro ao criar o usuario");
  }
};

export const authService = {
  signIn,
  getUserData,
  logout,
  createUser,
};

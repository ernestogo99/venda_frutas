import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

const refreshToken = async (): Promise<string | null> => {
  const refresh =
    localStorage.getItem("refresh_token") ||
    sessionStorage.getItem("refresh_token");
  if (!refresh) return null;

  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/token/refresh/",
      { refresh }
    );

    const newAccess = response.data.access;
    if (newAccess) {
      localStorage.setItem("access_token", newAccess);
      sessionStorage.setItem("access_token", newAccess);
      return newAccess;
    }
  } catch (error) {
    console.error("Erro ao renovar o token", error);
  }

  return null;
};

api.interceptors.request.use(
  async (config) => {
    const token =
      localStorage.getItem("access_token") ||
      sessionStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newToken = await refreshToken();
      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axios(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export { api };

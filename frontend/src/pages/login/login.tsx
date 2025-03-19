import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../shared/services/authservice";

const LoginScreen: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { username, password } = formData;

      const { access, user } = await authService.signIn(username, password);

      console.log("Usuário logado com sucesso:", user);
      console.log("Token de acesso:", access);

      localStorage.setItem("access_token", access);
      sessionStorage.setItem("access_token", access);

      navigate("/frutas");
    } catch (err: any) {
      setError("Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height={550}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          backgroundColor: "#f5f5f5",
          borderRadius: 2,
          boxShadow: 3,
          p: 4,
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          mb={3}
        >
          <Typography
            component="h1"
            fontSize={25}
            variant="h4"
            fontWeight="bold"
          >
            Login
          </Typography>
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField
            required
            margin="normal"
            fullWidth
            label="Usuário"
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            sx={{
              borderRadius: 2,
              backgroundColor: "#fff",
              "& .MuiInputBase-root": {
                borderRadius: 2,
              },
            }}
          />
          <TextField
            required
            margin="normal"
            fullWidth
            label="Senha"
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            sx={{
              borderRadius: 2,
              backgroundColor: "#fff",
              "& .MuiInputBase-root": {
                borderRadius: 2,
              },
            }}
          />
          {error && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              borderRadius: 2,
              mt: 2,
              mb: 2,
            }}
          >
            Entrar
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default LoginScreen;

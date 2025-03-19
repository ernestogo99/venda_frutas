import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginScreen: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
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

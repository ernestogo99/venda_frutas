import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../shared/services/authservice";
import toast from "react-hot-toast";

const CadastroScreen: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    type_user: "vendedor",
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

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    setFormData((prevData) => ({
      ...prevData,
      type_user: e.target.value as string,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { username, password, type_user } = formData;

    authService
      .createUser({
        user: { username, password },
        type_user: { type: type_user },
      })
      .then((response) => {
        console.log(response);
        toast.success("Usuário cadastrado com sucesso");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((err: any) => {
        setError(err.message);
        toast.error("Erro ao cadastrar o usuário");
      });
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
            Cadastro de Usuário
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
          <FormControl
            fullWidth
            required
            margin="normal"
            sx={{ backgroundColor: "#fff", borderRadius: 2 }}
          >
            <InputLabel>Tipo de Usuário</InputLabel>
            <Select
              value={formData.type_user}
              onChange={handleSelectChange}
              label="Tipo de Usuário"
              name="type_user"
            >
              <MenuItem value="vendedor">Vendedor</MenuItem>
              <MenuItem value="admin">Administrador</MenuItem>
            </Select>
          </FormControl>

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
            Cadastrar
          </Button>
          <Button
            fullWidth
            variant="contained"
            onClick={() => navigate("/login")}
            color="primary"
            sx={{
              borderRadius: 2,
            }}
          >
            Voltar
          </Button>
        </form>
      </Container>
    </Box>
  );
};

export default CadastroScreen;

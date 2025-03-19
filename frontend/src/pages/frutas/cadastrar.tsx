import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
  FormControlLabel,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import { Fruta } from "../../shared/interfaces/fruta";
import { Menulateral } from "../../shared/components";

interface FrutaFormProps {
  onSubmit?: (fruta: Fruta) => void;
}

const FrutaForm: React.FC<FrutaFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<Fruta>({
    nome: "",
    classificacao: "e",
    fresca: true,
    quantidade_disponivel: 0,
    valor_venda: 0.0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "valor_venda" || name === "quantidade_disponivel"
          ? Math.max(0, Number(value))
          : value,
    }));
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, fresca: e.target.checked }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    setFormData((prev) => ({ ...prev, classificacao: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.nome.trim() ||
      formData.quantidade_disponivel <= 0 ||
      formData.valor_venda <= 0
    ) {
      alert("Preencha todos os campos corretamente.");
      return;
    }
    onSubmit!(formData);
  };

  return (
    <Menulateral>
      {" "}
      <Container maxWidth="sm">
        <Box
          component="form"
          onSubmit={handleSubmit}
          p={3}
          boxShadow={3}
          borderRadius={2}
          bgcolor="#f5f5f5"
        >
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Cadastrar Nova Fruta
          </Typography>

          <TextField
            fullWidth
            label="Nome da Fruta"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            margin="normal"
            required
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Classificação</InputLabel>
            <Select
              name="classificacao"
              value={formData.classificacao}
              onChange={handleSelectChange}
            >
              <MenuItem value="e">Extra</MenuItem>
              <MenuItem value="p">De primeira</MenuItem>
              <MenuItem value="s">De segunda</MenuItem>
              <MenuItem value="t">De terceira</MenuItem>
            </Select>
          </FormControl>

          <FormControlLabel
            control={
              <Switch checked={formData.fresca} onChange={handleToggle} />
            }
            label="Fruta Fresca"
          />

          <TextField
            fullWidth
            label="Quantidade Disponível"
            name="quantidade_disponivel"
            type="number"
            value={formData.quantidade_disponivel}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Valor de Venda (R$)"
            name="valor_venda"
            type="number"
            value={formData.valor_venda}
            onChange={handleChange}
            margin="normal"
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Cadastrar
          </Button>
        </Box>
      </Container>
    </Menulateral>
  );
};

export default FrutaForm;

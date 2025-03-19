import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { Menulateral } from "../../shared/components";
import { Fruta } from "../../shared/interfaces/fruta";
import { FrutasService } from "../../shared/services/frutaservice";
import { VendaService } from "../../shared/services/vendaservice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const descontos = [0, 5, 10, 15, 20, 25];

const VendaForm: React.FC = () => {
  const [frutas, setFrutas] = useState<Fruta[]>([]);
  const [frutaId, setFrutaId] = useState<string>("");
  const [desconto, setDesconto] = useState<number>(0);
  const [quantidade, setQuantidade] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    FrutasService.getAllFrutas().then((result) => {
      if (result instanceof Error) {
        toast.error("Erro ao carregar as frutas");
      } else {
        setFrutas(result);
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!frutaId || quantidade <= 0) {
      toast.error("Preencha todos os campos corretamente.");
      return;
    }

    setLoading(true);

    const result = await VendaService.Vender({
      id: Number(frutaId),
      quantidade,
      desconto,
    });

    if (result instanceof Error) {
      toast.error(result.message);
    } else {
      toast.success("Venda realizada com sucesso!");
      setTimeout(() => navigate("/vendas"), 2000);
    }

    setLoading(false);
  };

  return (
    <Menulateral>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Container maxWidth="sm">
          <Box
            component="form"
            onSubmit={handleSubmit}
            p={3}
            boxShadow={3}
            borderRadius={2}
          >
            <Typography variant="h5" fontWeight="bold" mb={2}>
              Realizar Venda
            </Typography>

            <FormControl fullWidth margin="normal">
              <InputLabel id="fruta-label">Fruta</InputLabel>
              <Select
                labelId="fruta-label"
                value={frutaId}
                onChange={(e: SelectChangeEvent) => setFrutaId(e.target.value)}
                label="Fruta"
                required
              >
                {frutas.map((fruta) => (
                  <MenuItem key={fruta.id} value={fruta.id}>
                    {fruta.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel id="desconto-label">Desconto</InputLabel>
              <Select
                labelId="desconto-label"
                value={desconto.toString()}
                onChange={(e: SelectChangeEvent) =>
                  setDesconto(Number(e.target.value))
                }
                label="Desconto"
              >
                {descontos.map((d) => (
                  <MenuItem key={d} value={d}>
                    {d}%
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Quantidade"
              type="number"
              value={quantidade}
              onChange={(e) =>
                setQuantidade(Math.max(1, Number(e.target.value)))
              }
              margin="normal"
              required
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? "Vendendo..." : "Realizar Venda"}
            </Button>
          </Box>
        </Container>
      </Box>
    </Menulateral>
  );
};

export default VendaForm;

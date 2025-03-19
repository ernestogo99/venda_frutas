import { Fruta } from "./fruta";
import { UserData } from "./user";

export interface VendaResponse {
  vendedor: UserData;
  fruta: Fruta;
  quantidade: number;
  desconto: number;
  total: number;
  data: string;
}

export interface VendaBody {
  id: number;
  quantidade: number;
  desconto: number;
}

export interface RelatorioVenda {
  total: number;
  data: string;
  fruta_nome: string;
  quantidade: number;
}

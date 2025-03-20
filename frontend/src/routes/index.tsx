import { Route, Routes } from "react-router-dom";
import LoginScreen from "../pages/login/login";
import { Frutas } from "../pages/frutas/frutas";
import { useDrawercontext } from "../shared/contexts/drawercontext";
import { useEffect } from "react";
import { ListagemVendas } from "../pages/vendas/vendas";
import FrutaForm from "../pages/frutas/cadastrar";
import EditFrutaForm from "../pages/frutas/editar";
import VendaForm from "../pages/vendas/venderFrutas";
import CadastroScreen from "../pages/login/cadastrarusuario";

const AppRoutes = () => {
  const { setdraweroptions } = useDrawercontext();

  useEffect(() => {
    setdraweroptions([
      {
        label: "Frutas",
        icon: "home",
        path: "/frutas",
      },
      {
        label: "Relatório de vendas",
        icon: "sale",
        path: "/vendas",
      },
      {
        label: "Venda de frutas",
        icon: "sale",
        path: "/frutas/vendas",
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />}></Route>
      <Route path="*" element={<LoginScreen />}></Route>
      <Route path="/frutas" element={<Frutas />}></Route>
      <Route path="/vendas" element={<ListagemVendas />}></Route>
      <Route path="/frutas/cadastro" element={<FrutaForm />}></Route>
      <Route path="/frutas/editar/:id" element={<EditFrutaForm />}></Route>
      <Route path="/frutas/vendas" element={<VendaForm />}></Route>
      <Route path="/cadastro" element={<CadastroScreen />}></Route>
    </Routes>
  );
};

export default AppRoutes;

import { Route, Routes } from "react-router-dom";
import LoginScreen from "../pages/login/login";
import { Frutas } from "../pages/frutas/frutas";
import { useDrawercontext } from "../shared/contexts/drawercontext";
import { useEffect } from "react";
import { ListagemVendas } from "../pages/vendas/vendas";
import FrutaForm from "../pages/frutas/cadastrar";

const AppRoutes = () => {
  const { setdraweroptions } = useDrawercontext();

  useEffect(() => {
    setdraweroptions([
      {
        label: "frutas",
        icon: "home",
        path: "/frutas",
      },
      {
        label: "vendas",
        icon: "sale",
        path: "/vendas",
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
    </Routes>
  );
};

export default AppRoutes;

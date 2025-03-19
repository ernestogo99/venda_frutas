import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { Toaster } from "react-hot-toast";
import { AppDrawerprovider } from "./shared/contexts/drawercontext";
import { AppThemeProvider } from "./shared/contexts/themecontext";

function App() {
  return (
    <>
      <AppThemeProvider>
        <AppDrawerprovider>
          <BrowserRouter>
            <Toaster></Toaster>

            <AppRoutes></AppRoutes>
          </BrowserRouter>
        </AppDrawerprovider>
      </AppThemeProvider>
    </>
  );
}

export default App;

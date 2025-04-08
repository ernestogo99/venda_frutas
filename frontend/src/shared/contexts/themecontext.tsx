import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Box, ThemeProvider } from "@mui/material";
import { LightTheme, DarkTheme } from "../themes";

interface IThemecontextData {
  themename: "light" | "dark";
  toggletheme: () => void;
}

interface childrenprop {
  children: ReactNode;
}

const Themecontext = createContext({} as IThemecontextData);

export const useAppThemeContext = () => {
  return useContext(Themecontext);
};

export const AppThemeProvider: React.FC<childrenprop> = ({ children }) => {
  const [themename, setThemeName] = useState<"light" | "dark">("light");

  const toggletheme = useCallback(() => {
    setThemeName((oldthemename) =>
      oldthemename === "light" ? "dark" : "light"
    );
  }, []);

  const theme = useMemo(() => {
    if (themename === "light") return LightTheme;
    return DarkTheme;
  }, [themename]);
  return (
    <Themecontext.Provider value={{ themename, toggletheme }}>
      <ThemeProvider theme={theme}>
        <Box height="100vh" bgcolor={theme.palette.background.default}>
          {children}
        </Box>
      </ThemeProvider>
    </Themecontext.Provider>
  );
};

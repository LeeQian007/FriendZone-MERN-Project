import { Navigate, Routes, Route } from "react-router-dom";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material";
import { themeSettings } from "theme";
import { useRoutes } from "react-router-dom";

import { routes } from "routes";

function App() {
  const mode = useSelector((state) => state.mode);

  // createTheme(xx) from "@mui/materual"
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  const element = useRoutes(routes);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline>{element}</CssBaseline>
      </ThemeProvider>
    </>
  );
}

export default App;

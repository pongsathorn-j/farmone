import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#34C5B2",
      light: "#b2fef7",
      dark: "#4f9a94",
      contrastText: "000000",
    },
    secondary: {
      light: "#ea605d",
      main: "#e53935",
      dark: "#a02725",
      contrastText: "#000",
    },
  },
});

export default lightTheme;

import { createTheme } from "@mui/material";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1E1E2F",
      paper: "#2A2A3D",
    },
    primary: {
      main: "#00FFAB",
    },
    text: {
      primary: "#fff",
      secondary: "#ccc",
    },
  },
  typography: {
    fontFamily: "'Segoe UI', sans-serif",
  },
});

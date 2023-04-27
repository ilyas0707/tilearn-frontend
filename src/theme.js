import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#ce3f3f",
    },
  },
  typography: {
    fontFamily: "Montserrat",
    button: {
      textTransform: "none",
      fontWeight: 400,
      fontFamily: "Montserrat",
    },
  },
});

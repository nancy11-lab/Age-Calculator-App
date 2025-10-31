
import {  createTheme } from "@mui/material";
const direction = localStorage.getItem("appLang") === "ar" ? "rtl" : "ltr";
const theme = createTheme({
    direction,
    typography: {
      fontFamily: ["IBM"],
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: "0.7rem",
            transition: "all 0.3s ease", //  smooth transition
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgb(58,88,208)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgb(58,88,208)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgb(58,88,208)",
            },
          },
        },
      },
    },
  });

  export default theme;
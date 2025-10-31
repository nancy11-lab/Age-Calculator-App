import { Container, ThemeProvider } from "@mui/material";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import { useEffect } from "react";
import i18n from "./i18n";
import theme from "./theme/theme";
import { AgeCalcProvider } from "./context/AgeCalcContext";

function App() {
  useEffect(() => {
    const handleStorageChange = () => {
      const lang = localStorage.getItem("appLang") || "en";
      if (i18n.language !== lang) {
        i18n.changeLanguage(lang);
      }
    };
    // أول ما الصفحة تفتح
    handleStorageChange();
    // كل ما يحصل تغيير في localStorage (زي لما تمسحي اللغة)
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AgeCalcProvider>
        <div
          style={{
            padding: "0.7rem",
            minWidth: "320px",
          }}
        >
          <Container
            // className="border"
            maxWidth="md"
            disableGutters
            sx={{
              background: "#fff",
              p: "0.7rem",
              borderRadius: "2rem",
              boxShadow:
                "1px 1px 2px rgba(0 , 0 , 0 , 0.5) , -1px -1px 2px rgba(0 , 0 , 0 , 0.5)",
            }}
          >
            <Header />
            <MainContent />
          </Container>
        </div>
      </AgeCalcProvider>
    </ThemeProvider>
  );
}

export default App;

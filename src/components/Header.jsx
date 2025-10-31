import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const handleLanguageChange = () => {
    const newLang = currentLang === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("appLang", newLang);
  };
  return (
    <Box
      sx={{
        border: "2px solid #777",
        p: "0.5rem",
        mb: "1.5rem",
        width: "fit-content",
        cursor: "pointer",
        borderTopLeftRadius: currentLang === "en" ? "2rem" : "0px",
        borderTopRightRadius: currentLang === "ar" ? "2rem" : "0px[",
      }}
      onClick={handleLanguageChange}
    >
      <Typography variant="h6">{t("switchTo")[currentLang]}</Typography>
    </Box>
  );
}

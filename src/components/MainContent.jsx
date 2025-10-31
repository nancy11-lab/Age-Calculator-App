import { Box, Button, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import FormAge from "./FormAge";
import ResultBox from "./ResultBox";

export default function MainContent() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  return (
    <>
      {/* Box Date Entry */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          p: "0.5rem",
          mb: "1.5rem",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        {/* Title App */}
        <Typography variant="h6">{t("appTitle")[currentLang]}</Typography>
        {/* Form */}
        <FormAge />
      </Box>
      {/* Container Result Box */}
      <ResultBox />
    </>
  );
}

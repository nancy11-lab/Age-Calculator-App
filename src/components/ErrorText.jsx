import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";

export default function ErrorText({errorMsg}) {
    const { i18n } = useTranslation();
  return (
    <Typography
      variant="caption"
      sx={{
        color: "red",
        textAlign: i18n.language === "en" ? "left" : "right",
        m: "0.2rem 0.5rem",
      }}
    >
      {errorMsg}
    </Typography>
  );
}

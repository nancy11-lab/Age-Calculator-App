import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAgeCalc } from "../context/AgeCalcContext";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function Header() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const handleLanguageChange = () => {
    const newLang = currentLang === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("appLang", newLang);
  };
  const { calenderType, setCalenderType } = useAgeCalc();

  return (
    <Box
      // className="border"
      sx={{
        display: "flex",
        alignItems: "center",
        mb: "1.5rem",
        p: "0.3rem",
        gap: "0.5rem",
      }}
    >
      {/* Box Language-Change */}
      <Box
        sx={{
          border: "2px solid #777",
          p: "0.5rem",
          width: "fit-content",
          cursor: "pointer",
          borderTopLeftRadius: currentLang === "en" ? "2rem" : "0px",
          borderTopRightRadius: currentLang === "ar" ? "2rem" : "0px[",
        }}
        onClick={handleLanguageChange}
      >
        <Typography variant="h6">{t("switchTo")[currentLang]}</Typography>
      </Box>
      {/* نوع التقويم */}
      <Box sx={{ minWidth: 120 }}>
        <FormControl
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "2px solid #777",  
              },
              "&:hover fieldset": {
                borderColor: "#555",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#777", 
              },
            },
            "& .MuiInputLabel-root": {
              color: "black",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "black",      
            },
          }}
        >
          <InputLabel id="demo-simple-select-label">
            {t("calendarType")[i18n.language]}
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label={t("calendarType")[i18n.language]}
            value={calenderType}
            onChange={(e) => setCalenderType(e.target.value)}
          >
            <MenuItem value="gregorian">
              {t("gregorian")[i18n.language]}
            </MenuItem>
            <MenuItem value="hijri">{t("hijri")[i18n.language]}</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}

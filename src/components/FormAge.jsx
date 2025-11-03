import { Box, Button, TextField, Typography } from "@mui/material";
import { useAgeCalc } from "../context/AgeCalcContext";
import { useTranslation } from "react-i18next";
import ErrorText from "./ErrorText";

export default function FormAge() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const {
    day,
    dayError,
    dayRef,
    handleDayChange,
    month,
    monthError,
    monthRef,
    handleMonthChange,
    year,
    yearError,
    yearRef,
    handleYearChange,
    handleCalculatAge,
  } = useAgeCalc();
  return (
    <>
      {/* Form */}
      <Box
        component="form"
        onSubmit={handleCalculatAge}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        {/* input Filed */}
        <Box
          sx={{
            display: "flex",
            gap: "0.7rem",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          {/* Day - Box */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
            <TextField
              variant="outlined"
              name="day"
              inputRef={dayRef}
              tabIndex={1}
              value={day}
              onChange={handleDayChange}
              error={Boolean(dayError)}
              type="text"
              placeholder={i18n.language === "en" ? "DD" : " اليوم"}
              sx={{
                "& .MuiOutlinedInput-root": {
                  transition: "0.5s ease",

                  "&:hover fieldset": {
                    borderColor: dayError ? "red" : "var(--bg-primary)",
                  },

                  "&.Mui-focused fieldset": {
                    borderColor: dayError ? "red" : "var(--bg-primary)",
                  },
                },
              }}
            />
            {dayError && <ErrorText errorMsg={dayError} />}
          </Box>
          {/* Month - Box */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
            <TextField
              variant="outlined"
              name="month"
              inputRef={monthRef}
              tabIndex={2}
              value={month}
              onChange={handleMonthChange}
              error={Boolean(monthError)}
              type="text"
              placeholder={i18n.language === "en" ? "MM" : " الشهر"}
              sx={{
                "& .MuiOutlinedInput-root": {
                  transition: "0.5s ease",
                  "&:hover fieldset": {
                    borderColor: monthError ? "red" : "var(--bg-primary)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: monthError ? "red" : "var(--bg-primary)",
                  },
                },
              }}
            />
            {monthError && <ErrorText errorMsg={monthError} />}
          </Box>
          {/* Year - Box */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
            <TextField
              variant="outlined"
              name="year"
              inputRef={yearRef}
              tabIndex={3}
              value={year}
              onChange={handleYearChange}
              error={Boolean(yearError)}
              type="text"
              placeholder={i18n.language === "en" ? "YYYY" : " السنة"}
              sx={{
                "& .MuiOutlinedInput-root": {
                  transition: "0.5s ease",
                  "&:hover fieldset": {
                    borderColor: yearError ? "red" : "var(--bg-primary)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: yearError ? "red" : "var(--bg-primary)",
                  },
                },
              }}
            />
            {yearError && <ErrorText errorMsg={yearError} />}
          </Box>
        </Box>
        <Button
          type="submit"
          variant="outlined"
          sx={{
            textTransform: "capitalize",
            fontWeight: "bold",
            fontSize: "1rem",
            border: "2px solid rgb(0,117,255)",
            borderRadius: "0.5rem",
            transition: "0.3s ease",
            "&:hover": {
              background: "rgb(0,117,255)",
              color: "#fff",
            },
          }}
        >
          {t("btnCalc")[currentLang]}
        </Button>
      </Box>
    </>
  );
}

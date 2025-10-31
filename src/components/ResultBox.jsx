import { Box, Button, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAgeCalc } from "../context/AgeCalcContext";

export default function ResultBox() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const { birthdayInfo } = useAgeCalc();
  return (
    <>
      {/* Container Result Box */}
      <Box
        sx={{
          p: "1rem 0.5rem",
          background: "rgb(242,243,244)",
          borderRadius: "0.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          borderBottomLeftRadius: "2rem",
          borderBottomRightRadius: "2rem",
        }}
      >
        {/* ترجمه التاريخ */}
        <Box
          //   className="border"
          sx={{
            color: "var(--bg-primary)",
            display: "flex",
            gap: "0.2rem",
            justifyContent: { xs: "flex-start", sm: "center" },
            p: "0.5rem",
            flexWrap: "wrap",
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {t("bornOn")[currentLang]}:
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {birthdayInfo.birthDate
              ? `${
                  t("daysname")[i18n.language][birthdayInfo.birthDate.getDay()]
                } , ${
                  t("monthsname")[i18n.language][birthdayInfo.birthMonth - 1]
                } ${birthdayInfo.birthDay} , ${birthdayInfo.birthYear}`
              : "__"}
          </Typography>
        </Box>
        {/* Result Box عدد السنين */}
        <Box
          sx={{
            background: "var(--bg-primary)",
            color: "#fff",
            p: "0.5rem",
            borderRadius: "0.5rem",
            textAlign: "center",
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {birthdayInfo.years} {t("year")[currentLang]} ,{" "}
            {birthdayInfo.months} {t("months")[currentLang]} ,
            {birthdayInfo.days > 2 && birthdayInfo.days < 11
              ? `${birthdayInfo.days} ${t("days")[currentLang]} `
              : `${birthdayInfo.days} ${t("day")[currentLang]} `}
            {/* {birthdayInfo.days} {t("days")[currentLang]} */}
          </Typography>
        </Box>
        {/* الايام - الاسابيع - الشهور */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            color: "#fff",
            justifyContent: "center",
            alignItems: "center",
            mb: "1rem",
          }}
        >
          {/* weeks */}
          <Box
            sx={{
              p: "0.7rem",
              background: "var(--bg-primary)",
              borderRadius: "0.5rem",
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: { xs: "column", sm: "row" },
              gap: "0.5rem",
            }}
          >
            <Typography component="div" sx={{ fontWeight: "bold" }}>
              {t("weeks")[currentLang]} :
            </Typography>
            <Typography component="div" sx={{ fontWeight: "bold" }}>
              {birthdayInfo.totalWeeks}
            </Typography>
          </Box>
          {/* Days */}
          <Box
            sx={{
              p: "0.7rem",
              background: "var(--bg-primary)",
              borderRadius: "0.5rem",
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: { xs: "column", sm: "row" },
              gap: "0.5rem",
            }}
          >
            <Typography component="div" sx={{ fontWeight: "bold" }}>
              {t("days")[currentLang]} :
            </Typography>
            <Typography component="div" sx={{ fontWeight: "bold" }}>
              {birthdayInfo.totalDays}
            </Typography>
          </Box>
          {/* Months */}
          <Box
            sx={{
              p: "0.7rem",
              background: "var(--bg-primary)",
              borderRadius: "0.5rem",
              flexGrow: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: { xs: "column", sm: "row" },
              gap: "0.5rem",
            }}
          >
            <Typography component="div" sx={{ fontWeight: "bold" }}>
              {t("months")[currentLang]} :
            </Typography>
            <Typography component="div" sx={{ fontWeight: "bold" }}>
              {birthdayInfo.totalMonths}
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

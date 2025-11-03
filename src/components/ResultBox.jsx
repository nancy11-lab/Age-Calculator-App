import { Box, Button, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAgeCalc } from "../context/AgeCalcContext";
import moment from "moment-hijri";

export default function ResultBox() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const { birthdayInfo  , calenderType} = useAgeCalc();

  // الهجرى
 const getHijriDateString = () => {
    if (!birthdayInfo.birthDate)
      return `${birthdayInfo.birthDay} / ${birthdayInfo.birthMonth} / ${birthdayInfo.birthYear}`;
    let hijriMoment;
    if (calenderType === "hijri") {
      // لو المستخدم دخل هجري أصلاً، نستخدم التاريخ الهجري المدخل
      hijriMoment = moment(`${birthdayInfo.birthYear}/${birthdayInfo.birthMonth}/${birthdayInfo.birthDay}`, "iYYYY/iM/iD");
    } else {
      // لو ميلادي، نحوله من الميلادي للهجري
      hijriMoment = moment(birthdayInfo.birthDate);
    }
    const hijriDay = hijriMoment.iDate();
    const hijriMonth = hijriMoment.iMonth();
    const hijriYear = hijriMoment.iYear();
    const dayName = t("daysname")[currentLang][birthdayInfo.birthDate.getDay()];
    const monthName = t("hijriMonths")[currentLang][hijriMonth];
    return `${dayName} , ${monthName} ${hijriDay} , ${hijriYear}`;
  };

  const hijriDateString = getHijriDateString();

  // الميلادى
  const gregorianDateString = birthdayInfo.birthDate
    ? `${t("daysname")[currentLang][birthdayInfo.birthDate.getDay()]} , ${
        t("monthsname")[currentLang][birthdayInfo.birthDate.getMonth()]
      } ${birthdayInfo.birthDate.getDate()} , ${birthdayInfo.birthDate.getFullYear()}`
    : `${birthdayInfo.birthDay} / ${birthdayInfo.birthMonth} / ${birthdayInfo.birthYear}`;

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
          // className="border"
          sx={{
            mb: "1rem",
            p: "0.5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: { xs: "100%", sm: "80%", md: "60%" },
            margin: "0 auto",
          }}
        >
          {/* Box-Gregorian */}
          <Box
            // className="border"
            sx={{
              color: "var(--bg-primary)",
              display: "flex",
              gap: "0.2rem",
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Typography
              // className="border"
              variant="body1"
              sx={{
                fontWeight: "bold",
                width: { xs: "100%", sm: "155px" },
              }}
            >
              {t("bornOn")[currentLang]}({t("gregorian")[currentLang]}):
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", color: "#000" }}
            >
              {gregorianDateString}
            </Typography>
          </Box>
          {/* Box-Hijri */}
          <Box
            // className="border"
            sx={{
              color: "var(--bg-primary)",
              display: "flex",
              gap: "0.2rem",
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Typography
              // className="border"
              variant="body1"
              sx={{
                fontWeight: "bold",
                width: { xs: "100%", sm: "155px" },
              }}
            >
              {t("bornOn")[currentLang]}({t("hijri")[currentLang]}):
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: "bold", color: "#000" }}
            >
              {hijriDateString}
            </Typography>
          </Box>
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

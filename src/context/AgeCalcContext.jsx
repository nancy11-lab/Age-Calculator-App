import { createContext, useState, useRef, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";

const AgeCalcContext = createContext();

export function AgeCalcProvider({ children }) {
  const { t, i18n } = useTranslation();
  
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [dayError, setDayError] = useState("");
  const [monthError, setMonthError] = useState("");
  const [yearError, setYearError] = useState("");

  const [birthdayInfo, setBirthdayInfo] = useState({
    birthDate: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
    years: 0,
    months: 0,
    days: 0,
    totalDays: "--",
    totalWeeks: "--",
    totalMonths: "--",
  });

  const [dayTouched, setDayTouched] = useState(false);
  const [monthTouched, setMonthTouched] = useState(false);
  const [yearTouched, setYearTouched] = useState(false);

  // refs for inputs to control focus and tab order
  const dayRef = useRef(null);
  const monthRef = useRef(null);
  const yearRef = useRef(null);

  // دالة تحقق الحقول
  const validateFields = (dayValue, monthValue, yearValue) => {
    let dayErrorMsg = "";
    let monthErrorMsg = "";
    let yearErrorMsg = "";

    const d = parseInt(dayValue);
    const m = parseInt(monthValue);
    const y = parseInt(yearValue);
    const currentYear = new Date().getFullYear();

    // اليوم
    if (!dayValue) dayErrorMsg = t("errors.dayRequired")[i18n.language];
    else if (d < 1 || d > 31)
      dayErrorMsg = t("errors.dayInvalid")[i18n.language];

    // الشهر
    if (!monthValue) monthErrorMsg = t("errors.monthRequired")[i18n.language];
    else if (m < 1 || m > 12)
      monthErrorMsg = t("errors.monthInvalid")[i18n.language];

    // السنة
    if (!yearValue) yearErrorMsg = t("errors.yearRequired")[i18n.language];
    else if (y < 1900) yearErrorMsg = t("errors.yearTooOld")[i18n.language];
    else if (y > currentYear)
      yearErrorMsg = t("errors.yearFuture")[i18n.language];

    // التحقق من الأيام حسب الشهر (لو اليوم والشهر والسنة موجودة)
    if (!dayErrorMsg && !monthErrorMsg && !yearErrorMsg) {
      const daysInMonth = new Date(y, m, 0).getDate();
      if (d > daysInMonth) {
        dayErrorMsg = `${t("errors.dayInvalidForMonth")[i18n.language]} [${
          t("monthsname")[i18n.language][m - 1]
        }] ${y} ${t("errors.hasOnly")[i18n.language]} (${daysInMonth}) ${
          t("day")[i18n.language]
        }.`;
      }
    }

    return { dayErrorMsg, monthErrorMsg, yearErrorMsg };
  };

  useEffect(() => {
    dayRef.current?.focus();
  }, []);

  useEffect(() => {
    if (dayTouched || monthTouched || yearTouched) {
      const { dayErrorMsg, monthErrorMsg, yearErrorMsg } = validateFields(
        day,
        month,
        year
      );
      setDayError(dayErrorMsg);
      setMonthError(monthErrorMsg);
      setYearError(yearErrorMsg);
    }
  }, [i18n.language]);

  const handleDayChange = (e) => {
    setDayTouched(true);
    const valueOfDay = e.target.value;

    if (/^\d{0,2}$/.test(valueOfDay)) {
      setDay(e.target.value);
    }
    let dayErrorMsg =
      valueOfDay.length === 0
        ? t("errors.dayRequired")[i18n.language]
        : valueOfDay < 1 || valueOfDay > 31
        ? t("errors.dayInvalid")[i18n.language]
        : "";
    setDayError(dayErrorMsg);
  };

  const handleMonthChange = (e) => {
    setMonthTouched(true);
    const valueOfMonth = e.target.value;
    if (/^\d{0,2}$/.test(valueOfMonth)) {
      setMonth(e.target.value);
    }
    let monthErrorMsg =
      valueOfMonth.length === 0
        ? t("errors.monthRequired")[i18n.language]
        : valueOfMonth < 1 || valueOfMonth > 12
        ? t("errors.monthInvalid")[i18n.language]
        : "";
    setMonthError(monthErrorMsg);
  };
  const handleYearChange = (e) => {
    setYearTouched(true);
    const valueOfYear = e.target.value;
    if (/^\d{0,4}$/.test(valueOfYear)) {
      setYear(valueOfYear);
    }
    let yearErrorMsg =
      valueOfYear.length === 0
        ? t("errors.yearRequired")[i18n.language]
        : valueOfYear < 1
        ? t("errors.yearPositive")[i18n.language]
        : valueOfYear > new Date().getFullYear()
        ? t("errors.yearFuture")[i18n.language]
        : valueOfYear < 1900
        ? t("errors.yearTooOld")[i18n.language]
        : valueOfYear.length < 4
        ? t("errors.yearFourDigits")[i18n.language]
        : "";
    setYearError(yearErrorMsg);
  };

  const handleCalculatAge = (e) => {
    e.preventDefault();

    setDayTouched(true);
    setMonthTouched(true);
    setYearTouched(true);

    const { dayErrorMsg, monthErrorMsg, yearErrorMsg } = validateFields(
      day,
      month,
      year
    );

    setDayError(dayErrorMsg);
    setMonthError(monthErrorMsg);
    setYearError(yearErrorMsg);

    if (dayErrorMsg || monthErrorMsg || yearErrorMsg) {
      // وضع focus على أول حقل فيه خطأ
      if (dayErrorMsg) dayRef.current?.focus();
      else if (monthErrorMsg) monthRef.current?.focus();
      else if (yearErrorMsg) yearRef.current?.focus();
      return;
    }

    const d = parseInt(day);
    const m = parseInt(month);
    const y = parseInt(year);

    const today = new Date();
    // console.log(today);

    let ageYearNow = today.getFullYear() - y;
    let ageMonthNow = today.getMonth() + 1 - m;
    let ageDayNow = today.getDate() - d;

    if (ageDayNow < 0) {
      ageMonthNow--;
      const prevMonthDays = new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      ).getDate();
      ageDayNow += prevMonthDays;
    }
    if (ageMonthNow < 0) {
      ageYearNow--;
      ageMonthNow += 12;
    }

    // تاريخ الميلا الي كتبته
    const birthDate = new Date(y, m - 1, d);
    // const birthDayName = t("daysname")[i18n.language][birthDate.getDay()];
    // لايجاد عدد الاسابيع و الشهور والايام
    const diffInMs = today - birthDate;
    const totalDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = ageYearNow * 12 + ageMonthNow;
    setBirthdayInfo({
      birthDate: birthDate,
      birthDay: d,
      birthMonth: m,
      birthYear: y,
      years: ageYearNow,
      months: ageMonthNow,
      days: ageDayNow,
      totalDays: totalDays,
      totalWeeks: totalWeeks,
      totalMonths: totalMonths,
    });

    const noErrors =
      !dayError &&
      !monthError &&
      !yearError &&
      dayTouched &&
      monthTouched &&
      yearTouched;

    if (noErrors) {
      setDay("");
      setMonth("");
      setYear("");
      setDayTouched(false);
      setMonthTouched(false);
      setYearTouched(false);
      dayRef.current?.focus();
    }
  };

  return (
    <AgeCalcContext.Provider
      value={{
        day,
        setDay,
        month,
        setMonth,
        year,
        setYear,
        dayError,
        monthError,
        yearError,
        birthdayInfo,
        dayRef,
        monthRef,
        yearRef,
        handleDayChange,
        handleMonthChange,
        handleYearChange,
        handleCalculatAge,
      }}
    >
      {children}
    </AgeCalcContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAgeCalc = () => useContext(AgeCalcContext);

import { createContext, useState, useRef, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";

import moment from "moment-hijri";
import "moment/locale/ar";

function toEnglishDigits(str) {
  return str.replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));
}

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
    birthDay: "--",
    birthMonth: "--",
    birthYear: "--",
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

  // calender Type
  const [calenderType, setCalenderType] = useState(
    localStorage.getItem("calenderType") || "gregorian"
  ); // or "hijri"
  useEffect(() => {
    localStorage.setItem("calenderType", calenderType);
  }, [calenderType]);

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
    const currentGregorianYear = new Date().getFullYear();
    const currentHijriYear = parseInt(
      toEnglishDigits(moment().format("iYYYY")),
      10
    );

    const isHijri = calenderType === "hijri";
    const currentYear = isHijri ? currentHijriYear : currentGregorianYear;

    // اليوم
    if (!dayValue) dayErrorMsg = t("errors.dayRequired")[i18n.language];
    else if (d < 1 || (isHijri ? d > 30 : d > 31)) {
      dayErrorMsg = isHijri
        ? t("errors.dayInvalidHijri")[i18n.language]
        : t("errors.dayInvalid")[i18n.language];
    }

    // الشهر
    if (!monthValue) monthErrorMsg = t("errors.monthRequired")[i18n.language];
    else if (m < 1 || m > 12)
      monthErrorMsg = t("errors.monthInvalid")[i18n.language];

    // السنة
    if (!yearValue) yearErrorMsg = t("errors.yearRequired")[i18n.language];
    else if (isHijri ? y < 1300 : y < 1900) {
      yearErrorMsg = isHijri
        ? t("errors.yearHjiriTooOld")[i18n.language]
        : t("errors.yearTooOld")[i18n.language];
    } else if (y > currentYear)
      yearErrorMsg = t("errors.yearFuture")[i18n.language];

    // التحقق من الأيام حسب الشهر (لو اليوم والشهر والسنة موجودة)
    if (!dayErrorMsg && !monthErrorMsg && !yearErrorMsg) {
      let daysInMonth;

      if (isHijri) {
        const hijriDate = moment(`${y}/${m}/1`, "iYYYY/iM/iD");//اول يوم في الشهر
        daysInMonth = hijriDate.endOf("iMonth").iDate(); // اخر يوم فعلى في الشهر كرقم
      } else {
        daysInMonth = new Date(y, m, 0).getDate(); //الميلادي
      }
      if (d > daysInMonth) {
        const monthsNames = isHijri
          ? t("hijriMonths")[i18n.language]
          : t("monthsname")[i18n.language];
        dayErrorMsg = `${t("errors.dayInvalidForMonth")[i18n.language]} [${
          monthsNames[m - 1]
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
  }, [i18n.language, calenderType]);

  const handleDayChange = (e) => {
    setDayTouched(true);
    let valueOfDay = e.target.value;

    // السماح فقط بالارقام
    valueOfDay = valueOfDay.replace(/\D/g, "");
    // السماح فقط ب 2 ارقام كحد اقصى
    if (valueOfDay.length > 2) return;
    setDay(valueOfDay);

    let dayErrorMsg = "";
    if (valueOfDay.length === 0) {
      dayErrorMsg = t("errors.dayRequired")[i18n.language];
    } else {
      // if user select Hijri
      if (calenderType === "hijri") {
        if (valueOfDay < 1 || valueOfDay > 30) {
          dayErrorMsg = t("errors.dayInvalidHijri")[i18n.language];
        }
      }
      // if user select gregorian
      else {
        if (valueOfDay < 1 || valueOfDay > 31) {
          dayErrorMsg = t("errors.dayInvalid")[i18n.language];
        }
      }
    }
    setDayError(dayErrorMsg);
  };

  const handleMonthChange = (e) => {
    setMonthTouched(true);
    let valueOfMonth = e.target.value;
    // السماح فقط بالارقام
    valueOfMonth = valueOfMonth.replace(/\D/g, "");
    // السماح فقط ب 2 ارقام كحد اقصى
    if (valueOfMonth.length > 2) return;
    setMonth(valueOfMonth);

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
    let valueOfYear = e.target.value;
    // السماح فقط بالارقام
    valueOfYear = valueOfYear.replace(/\D/g, "");
    // السماح فقط ب4 ارقام كحد اقصى
    if (valueOfYear.length > 4) return;
    setYear(valueOfYear);
    const currentGregorianYear = new Date().getFullYear();
    const currentHijriYear = parseInt(
      toEnglishDigits(moment().format("iYYYY")),
      10
    );
    const maxYear =
      calenderType === "hijri" ? currentHijriYear : currentGregorianYear;

    let yearErrorMsg = "";
    if (valueOfYear.length === 0) {
      yearErrorMsg = t("errors.yearRequired")[i18n.language];
    } else if (valueOfYear < 1) {
      yearErrorMsg = t("errors.yearPositive")[i18n.language];
    } else if (valueOfYear.length < 4) {
      yearErrorMsg = t("errors.yearFourDigits")[i18n.language];
    } else if (Number(valueOfYear) > maxYear) {
      yearErrorMsg = t("errors.yearFuture")[i18n.language];
    } else {
      if (calenderType === "gregorian") {
        if (valueOfYear < 1900) {
          yearErrorMsg = t("errors.yearTooOld")[i18n.language];
        }
      } else if (calenderType === "hijri") {
        if (valueOfYear < 1300) {
          yearErrorMsg = t("errors.yearHjiriTooOld")[i18n.language];
        }
      }
    }

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

    const d = parseInt(day, 10);
    const m = parseInt(month, 10);
    const y = parseInt(year, 10);

    const today = new Date();
    // console.log(today);

    let ageYearNow = 0;
    let ageMonthNow = 0;
    let ageDayNow = 0;
    let birthDate;

    if (calenderType === "hijri") {
      const daysInMonth = moment(`${y}/${m}/1`, "iYYYY/iM/iD")
        .endOf("iMonth")
        .iDate();
      const dayCorrected = Math.min(d, daysInMonth);
      const hijriBirth = moment(`${y}/${m}/${dayCorrected}`, "iYYYY/iM/iD");

      // console.log("higri:" , hijriBirth);
      birthDate = hijriBirth.toDate(); //تحويل التاريخ من هجري الي ميلادى
      // console.log(birthDate);

      let todayHijri = moment().format("iYYYY-iM-iD").split("-");
      // console.log(todayHijri);
      let tY = parseInt(toEnglishDigits(todayHijri[0]), 10);
      let tM = parseInt(toEnglishDigits(todayHijri[1]), 10);
      let tD = parseInt(toEnglishDigits(todayHijri[2]), 10);
      ageYearNow = tY - y;
      ageMonthNow = tM - m;
      ageDayNow = tD - d;

      if (ageDayNow < 0) {
        ageMonthNow--;
        //ايام الشهر الهجري السابق
        const prevMonthDays = moment(`${tY}-${tM} - 1`, "iYYYY-iM-iD")
          .subtract(1, "iMonth")
          .endOf("iMonth")
          .iDate();
        ageDayNow += prevMonthDays;
      }
      if (ageMonthNow < 0) {
        ageYearNow--;
        ageMonthNow += 12;
      }
    } else {
      //الميلادي
      birthDate = new Date(y, m - 1, d);
      ageYearNow = today.getFullYear() - y;
      ageMonthNow = today.getMonth() + 1 - m;
      ageDayNow = today.getDate() - d;

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
    }

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
        calenderType,
        setCalenderType,
      }}
    >
      {children}
    </AgeCalcContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAgeCalc = () => useContext(AgeCalcContext);

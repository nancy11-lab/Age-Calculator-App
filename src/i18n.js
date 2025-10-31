import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

// اللغة المحفوظة أو الافتراضية
const savedLang = localStorage.getItem("appLang") || "en";

i18n
  .use(HttpBackend) // تحميل ملفات الترجمة من public
  .use(initReactI18next)
  .init({
    lng: savedLang,
    fallbackLng: "en",
    backend: {
      loadPath: `${import.meta.env.BASE_URL}locales/{{lng}}/translation.json`,
    },
    interpolation: {
      escapeValue: false, // React بيهتم بالأمان تلقائيًا
    },
    returnObjects: true, //عشان تقدر تتعامل مع الكائن الي في en/ar
  });

i18n.on("languageChanged", (lng) => {
  if (lng === "ar") {
    document.body.setAttribute("dir", "rtl");
  } else {
    document.body.setAttribute("dir", "ltr");
  }
  localStorage.setItem("appLang", lng);
});

// تطبيق الاتجاه الافتراضي عند التشغيل
if (savedLang === "ar") {
  document.body.setAttribute("dir", "rtl");
} else {
  document.body.setAttribute("dir", "ltr");
}

export default i18n;

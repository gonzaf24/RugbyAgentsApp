import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detectBrowserLanguage from "detect-browser-language";
import es from "./es.js";
import en from "./en.js";
import fr from "./fr.js";
import it from "./it.js";

const resources = {
  es: es,
  en: en,
  fr: fr,
  it: it,
};

let lang =
  window.localStorage.getItem("lang") ||
  detectBrowserLanguage() !== ("es" || "en" || "it" || "fr")
    ? "en"
    : detectBrowserLanguage();

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: lang,
    keySeparator: false, // we do not use keys in form messages.welcome
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;

import i18n from "i18next";
import Backend from "i18next-xhr-backend";
import { initReactI18next } from "react-i18next";

let language;

switch (navigator.language) {
  case "pt-BR":
    language = "pt_br";
    break;

  default:
    language = "en_us";
    break;
}

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: language,
    backend: {
      /* translation file path */
      loadPath: "/assets/i18n/{{ns}}/{{lng}}.json",
    },
    fallbackLng: "en_us",
    debug: false,
    /* can have multiple namespace, in case you want to divide a huge translation into smaller pieces and load them on demand */
    ns: ["translations"],
    defaultNS: "translations",
    //keySeparator: false,
    interpolation: {
      escapeValue: false,
      formatSeparator: ",",
    },
  });

export default i18n;

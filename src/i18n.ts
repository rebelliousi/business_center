import i18n from "i18next";
import { initReactI18next } from "react-i18next";


i18n

  .use(initReactI18next)
  .init({
    fallbackLng: "tk",               // Ana dil Türkmence
    lng: "tk",                       // (Opsiyonel) Başlangıçta Türkmence başlatmak için
    debug: false,
    interpolation: { escapeValue: false },
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json"
    }
  });

export default i18n;
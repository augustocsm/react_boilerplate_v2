import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const en_us = () => i18n.changeLanguage("en_us");
  const pt_br = () => i18n.changeLanguage("pt_br");

  return (
    <div>
      <i className="us flag" onClick={en_us} />
      <i className="br flag" onClick={pt_br} />
    </div>
  );
};

export default LanguageSelector;

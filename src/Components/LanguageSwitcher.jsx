import React from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = () => {
    // Cambia entre 'en' y 'es'
    const newLanguage = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLanguage);
  };

  return (
    <div>
      <div className="dropdown dropdown-end">
        <button
          tabIndex={0}
          role="button"
          className="btn m-1 bg-Blue950 text-white"
          onClick={changeLanguage}
        >
          {i18n.language === 'en' ? 'ES' : 'EN'}
        </button>
      </div>
    </div>
  );
}

export default LanguageSwitcher;

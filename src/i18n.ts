import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      settings: {
        title: 'Settings',
        language: 'Language',
        theme: 'Dark Theme',
        location: 'Your Location',
        locationLoading: 'Loading location...'
      }
    }
  },
  ru: {
    translation: {
      settings: {
        title: 'Настройки',
        language: 'Язык',
        theme: 'Тёмная тема',
        location: 'Ваше местоположение',
        locationLoading: 'Загрузка местоположения...'
      }
    }
  },
  es: {
    translation: {
      settings: {
        title: 'Configuración',
        language: 'Idioma',
        theme: 'Tema Oscuro',
        location: 'Tu ubicación',
        locationLoading: 'Cargando ubicación...'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
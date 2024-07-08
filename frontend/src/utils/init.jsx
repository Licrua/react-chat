import { I18nextProvider, initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import App from '../components/App';
import en from './components/react-router/redux/locales/en.json';
import ru from './components/react-router/redux/locales/ru.json';

const init = async () => {
  const i18n = i18next.createInstance();

  const resources = {
    en: {
      translation: en,
    },
    ru: {
      translation: ru,
    },
  };

  await i18n.use(initReactI18next).init({
    resources,
    debug: true,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

  window.i18n = i18n;

  return (
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  );
};

export default init;

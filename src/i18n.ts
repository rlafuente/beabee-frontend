import { createI18n } from 'vue-i18n';
import messages from '../locales/_current.json';

// We don't allow changing locales for now so fine to hardcode
const locale = messages.locale;

const numberFormats = {
  [locale]: {
    currency: {
      style: 'currency',
      currency: import.meta.env.VITE_CURRENCY as string,
    },
  },
};

const i18n = createI18n({
  locale,
  messages: {
    [locale]: messages,
  },
  numberFormats,
});

export default i18n;

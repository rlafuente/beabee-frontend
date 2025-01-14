import { Library, library } from '@fortawesome/fontawesome-svg-core';
import {
  faAddressCard as farAddressCard,
  faBuilding as farBuilding,
  faCalendarCheck as farCalendarCheck,
  faCreditCard as farCreditCard,
  faUser as farUser,
} from '@fortawesome/free-regular-svg-icons';
import {
  faSignInAlt,
  faCaretDown,
  faCaretUp,
  faExclamation,
  faInfoCircle,
  faBullhorn,
  faKey,
  faMagic,
  faBomb,
  faTimes,
  faCircleNotch,
  faCheck,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  farBuilding,
  farUser,
  farCalendarCheck,
  farAddressCard,
  farCreditCard,
  faSignInAlt,
  faCaretDown,
  faCaretUp,
  faInfoCircle,
  faExclamation,
  faBullhorn,
  faKey,
  faMagic,
  faBomb,
  faTimes,
  faCircleNotch,
  faCheck,
  faUsers
);

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { App } from 'vue';

export default {
  install(app: App): Library {
    app.component('FontAwesomeIcon', FontAwesomeIcon);

    return library;
  },
};

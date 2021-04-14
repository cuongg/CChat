import I18n from 'react-native-i18n';
import en from './en';
import vi from './vi';

import {LANGUAGE_VIETNAM} from './Language';

I18n.fallbacks = true;
I18n.translations = {en, vi};
I18n.locale = LANGUAGE_VIETNAM;
export const trans = (messages: string) => I18n.t(messages);
export default I18n;

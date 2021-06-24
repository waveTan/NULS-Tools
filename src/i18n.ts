import {createI18n} from 'vue-i18n' // import from runtime only

import elementEnLocale from 'element-plus/lib/locale/lang/en'
import elementZhLocale from 'element-plus/lib/locale/lang/zh-cn'

// User defined lang
import zhLocale from './locales/zh-cn'
import enLocale from './locales/en'

const messages = {
    en: {
        ...enLocale,
        ...elementEnLocale
    },
    cn: {
        ...zhLocale,
        ...elementZhLocale
    }
};

export const getLocale = () => {
    const language = 'cn'; //todo 动态获取
    const locales = Object.keys(messages);
    for (const locale of locales) {
        if (language.indexOf(locale) > -1) {
            return locale
        }
    }
    return 'cn'
};

const i18n = createI18n({
    locale: getLocale(),
    messages: messages
});

export default i18n
import i18n from "i18n-js";
import memoize from "lodash.memoize"; 
import {I18nManager,AsyncStorage} from 'react-native';
import { Updates } from 'expo';

const translationGetters = {
  ar: () => require('./ar.json'),
  en: () => require('./en.json'),
};

export const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key)
);

export const setI18nConfig = async(lang,isRTL) => {
  await AsyncStorage.setItem('locale', lang);
  I18nManager.forceRTL(isRTL);
  i18n.translations = { [lang]: translationGetters[lang]() };
  i18n.locale = lang;
};

export const SetFirstTime = async (lang, isRTL) => {
  await AsyncStorage.setItem('locale', lang);
  i18n.translations = { [lang]: translationGetters[lang]() };
  i18n.locale = lang;
};

export const changeLanguage = async(lang,isRTL) => {
  await AsyncStorage.setItem('locale',lang);
  I18nManager.forceRTL(isRTL);
  i18n.translations = { [lang]: translationGetters[lang]() };
  i18n.locale = lang;
  Updates.reload();
}
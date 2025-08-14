
import { translationsData } from './translations-data';

export const translations = translationsData;

export type Translations = typeof translations;
export type TranslationKeys = keyof Translations['en'];

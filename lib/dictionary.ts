import 'server-only'
import type { Locale } from '@/i18n'

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then(module => module.default),
  fr: () => import('@/dictionaries/fr.json').then(module => module.default),
  sw: () => import('@/dictionaries/sw.json').then(module => module.default),
}

/**
 * Loads the translations for the requested locale
 * 
 * @param locale 
 * @returns 
 */
export const getDictionary = async (locale: Locale) => dictionaries[locale]();
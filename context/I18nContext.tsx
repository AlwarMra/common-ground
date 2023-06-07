import React, { createContext, useCallback, useContext, useState } from 'react'
import es from '../public/locales/es.json'
import en from '../public/locales/en.json'
import { useRouter } from 'next/router'
import { langs } from '../types/common'

type localeModel = typeof es
type I18nModel = {
  currentLang: localeModel
  changeLang: (l: string) => void
  routerLocale: langs
}
interface Props {
  children: React.ReactNode
}

const languages: { [key: string]: localeModel } = { es, en }
export const I18nContext = createContext<I18nModel>({} as I18nModel)

export const I18nContextProvider: React.FC<Props> = ({ children }) => {
  const { locale } = useRouter()

  const routerLocale = locale === undefined ? langs.ES : (locale as langs)
  const t = languages[routerLocale]
  const [currentLang, setCurrentLang] = useState(t)
  const changeLang = (l: string) => setCurrentLang(languages[l])

  const value = {
    routerLocale,
    currentLang,
    changeLang,
  }

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

// I18n Hook
export function useI18n() {
  const { currentLang: t, changeLang, routerLocale } = useContext(I18nContext)
  return { t, changeLang, routerLocale }
}

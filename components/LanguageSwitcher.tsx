import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { langs as langsEnum } from 'types/common'
import { useI18n } from 'context/I18nContext'
import { ChevronIcon, EnglishIcon, SpanishIcon } from 'components/Icons'

const LanguageSwitcher = () => {
  const { changeLang, routerLocale } = useI18n()
  const [open, setOpen] = useState(false)
  const { asPath } = useRouter()
  const langs = [
    {
      lang: langsEnum.ES,
      icon: (size = 30) => {
        return <SpanishIcon size={size} />
      },
    },
    {
      lang: langsEnum.EN,
      icon: (size = 30) => {
        return <EnglishIcon size={size} />
      },
    },
  ]
  const i = langs.findIndex(i => i.lang === routerLocale)
  const [currentLang, setCurrentLang] = useState(langs[i])

  const switchLanguage = (l: string) => {
    var newLang = langs.find(obj => {
      return obj.lang === l
    })
    changeLang(l)
    setCurrentLang(newLang!)
    setOpen(false)
  }

  return (
    <>
      <div className='relative py-2'>
        <button
          onClick={() => setOpen(!open)}
          id='states-button'
          className='flex-shrink-0 inline-flex items-center py-2.5 px-4 text-sm bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100'
          type='button'
        >
          {currentLang.icon(20)}
          <ChevronIcon />
        </button>
        <div
          id='languages-states'
          className={
            'z-10 absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded shadow w-20 dark:bg-gray-700 ' +
            (open ? '' : 'hidden')
          }
        >
          <ul className='py-1' aria-labelledby='languages-button'>
            {langs.map(l => (
              <li key={l.lang}>
                <Link
                  href={asPath}
                  locale={l.lang}
                  onClick={() => switchLanguage(l.lang)}
                  type='button'
                  lang={l.lang}
                  className='flex justify-center w-full px-4 py-2 hover:bg-gray-100'
                >
                  {l.icon()}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default LanguageSwitcher

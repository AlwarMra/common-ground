import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthContextProvider } from '../context/AuthContext'
import { I18nContextProvider } from '../context/I18nContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <I18nContextProvider>
        <Component {...pageProps} />
      </I18nContextProvider>
    </AuthContextProvider>
  )
}

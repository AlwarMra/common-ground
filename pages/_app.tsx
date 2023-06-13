import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthContextProvider } from '../context/AuthContext'
import { I18nContextProvider } from '../context/I18nContext'
import Layout from '../components/Layout'
import { Provider } from 'react-redux'
import { store } from '../store'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthContextProvider>
        <I18nContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </I18nContextProvider>
      </AuthContextProvider>
    </Provider>
  )
}

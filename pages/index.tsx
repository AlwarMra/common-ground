import Head from 'next/head'
import Banner from '../components/Banner'
import ProductGrid from '../components/ProductGrid'
import { GetStaticProps } from 'next'
import { getAllProducts } from '../firebase/clientApp'
import { useI18n } from '../context/I18nContext'
import shuffleArray from '../utils/utils'

export default function Home({ prods }: { prods: any }) {
  const { routerLocale } = useI18n()
  return (
    <>
      <Head>
        <title>Commonground</title>
        <meta
          name='description'
          content='Commondground,the soundsystem backyard'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Banner />
      <ProductGrid prods={prods} lang={routerLocale} />
    </>
  )
}

export const getStaticProps: GetStaticProps<{ prods: any }> = async () => {
  try {
    const prods = await getAllProducts()
    shuffleArray(prods)
    return {
      props: { prods },
    }
  } catch {
    return {
      notFound: true,
    }
  }
}

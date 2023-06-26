import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { GetServerSideProps } from 'next'
import { getProductById } from '../../firebase/clientApp'
import { Product } from '../../types/common'
import { useI18n } from '../../context/I18nContext'

const Product = ({ prod }: { prod: Product }) => {
  const [mainImage, setMainImage] = useState<string>('')
  const lang = useI18n().routerLocale.toString() as keyof Product

  useEffect(() => {
    setMainImage(prod.images[0])
  }, [prod.images])

  return (
    <section className=' max-w-[95%] mx-auto mt-12'>
      <div className=' bg-white rounded-md grid shadow-md shadow-red-200 m-auto md:min-h-[750px] md:min-w-[600px] md:grid-cols-custom-product md:py-10'>
        <div className='relative mb-10'>
          <div className='w-full h-full shadow-2xl drop-shadow-[1px_20px_10px_rgb(165,243,252)] rounded-md grid grid-rows-1 md:max-h-[450px] md:absolute md:-left-10'>
            <div className='flex justify-between'>
              <span>share</span>
              <span>favorite</span>
            </div>
            <Image
              src={mainImage}
              /* @ts-ignore */
              alt={prod[lang].title}
              width={400}
              height={400}
              className='w-full h-full max-w-full max-h-full object-cover rounded-t-md  saturate-150 contrast-125 hue-rotate-15'
            />
            <div>
              <div className='bg-red-50 p-4 flex gap-8 rounded-b-md overflow-x-auto'>
                {prod.images.map((img, i) => (
                  <Image
                    className={
                      'cursor-pointer rounded-md ' +
                      (mainImage === img ? 'border-2 border-amber-400' : '')
                    }
                    key={img + i}
                    src={img}
                    alt='sdfdf'
                    width={80}
                    height={80}
                    onClick={() => setMainImage(img)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='p-43'>
          <div className='py-3 font-fancy text-xl'>{prod.es.title}</div>
          <div className='my-5 text-red-500 text-4xl'>{prod.price}€</div>
          <div
            className='my-5 pr-4 [&>*]:mb-4'
            /* @ts-ignore */
            dangerouslySetInnerHTML={{ __html: prod[lang].description }}
          />
          <button className='bg-red-500 p-4 rounded-md'>sfdsfsdff</button>
        </div>
      </div>
    </section>
  )
}

export const getServerSideProps: GetServerSideProps<{
  prod: Product
}> = async ctx => {
  const id = ctx.query.id as string
  try {
    const prod = (await getProductById(id)) as Product
    return { props: { prod } }
  } catch {
    return {
      notFound: true,
    }
  }
}

export default Product

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '../types/common'
import { Spinner, AddIcon } from './Icons'
import useProduct from '../hooks/useProduct'
type ObjectKey = keyof Product
interface ProductCardProps {
  prod: Product
  lang: ObjectKey
  index: number
}

const ProductCard = ({ prod, lang, index }: ProductCardProps) => {
  const { submitProduct, isLoading } = useProduct()

  return (
    <div
      className={
        'block shadow-sm rounded-md p-4 bg-white mb-8 md:mb-0 shadow-cyan-100 ' +
        (index === 4 ? 'col-span-2' : '')
      }
    >
      <Link href={`/products/${prod.id}`} className='group relative'>
        <div className='w-full relative group-hover:-translate-y-8 transition ease-in-out duration-300'>
          <Image
            src={prod.images[0]}
            alt=''
            width={500}
            height={500}
            className={
              (index === 4 ? 'aspect-video ' : '') +
              'rounded-md w-full h-auto object-cover group-hover:shadow-2xl group-hover:shadow-cyan-200 transition ease-in-out duration-300'
            }
          />
        </div>
      </Link>
      <div className='pt-8 text-center mb-6'>
        {/* @ts-ignore  ===> I know it will always be defined!!!!!!!! */}
        <h3 className='bold font-fancy mb-3'>{prod[lang].title}</h3>
        <div
          className='overflow-hidden'
          style={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: '3',
          }}
          /* @ts-ignore */
          dangerouslySetInnerHTML={{ __html: prod[lang].description }}
        />
      </div>
      <div className='flex justify-between items-center border-t-2 border-cyan-100 pt-6 pb-1'>
        <div className='float-left'>
          <span className='font-bold'>{prod.price}€</span>
          {prod.compared_at_price > 0 && (
            <span className='ml-3 line-through text-red-500'>
              {prod.compared_at_price}€
            </span>
          )}{' '}
        </div>
        <div className='float-right'>
          {isLoading ? (
            <span className='block w-10 h-10'>
              <Spinner size={30} bgColor={'text-cyan-100'} />
            </span>
          ) : (
            <span className='font-bold' onClick={() => submitProduct(prod)}>
              <AddIcon size={40} />
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard

import React from 'react'
import { Product } from '../types/common'
import Image from 'next/image'
import Link from 'next/link'

type ObjectKey = keyof Product
interface ProductCardProps {
  prod: Product
  lang: ObjectKey
  index: number
}

const ProductCard = ({ prod, lang, index }: ProductCardProps) => {
  const title = ('title_' + lang) as keyof Product
  const desc = ('description_' + lang) as keyof Product
  return (
    <Link
      href={''}
      className={
        'block shadow-sm shadow-cyan-100 rounded-md relative p-4 bg-white group mb-8 md:mb-0 ' +
        (index === 4 ? 'col-span-2' : '')
      }
    >
      <div className='w-full relative group-hover:-translate-y-8 transition ease-in-out duration-300'>
        <Image
          src={prod.images[0]}
          alt=''
          width={500}
          height={500}
          style={{ objectFit: 'cover' }}
          className={
            (index === 4 ? 'aspect-video ' : '') +
            'rounded-md w-full h-auto group-hover:shadow-2xl group-hover:shadow-cyan-200 transition ease-in-out duration-300'
          }
        />
      </div>
      <div className='pt-8 text-center mb-6'>
        /{/* @ts-ignore  ===> I know it will always be defined!!!!!!!! */}
        <h3 className='bold font-fancy mb-3'>{prod[lang][title]}</h3>
        <p
          className='overflow-hidden'
          style={{
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: '3',
          }}
        >
          {/* @ts-ignore */}
          {prod[lang][desc]}
        </p>
      </div>
      <div className="border-t-2 border-cyan-100 pt-6 pb-1 before:content-[''] before:table after:content-[''] after:table after:clear-both">
        <div className='float-left'>
          <span className='font-bold'>{prod.price}€</span>
        </div>
        <div className='float-right'>
          <span className='font-bold'>symbol</span>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard

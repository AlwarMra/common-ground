import React from 'react'
import { CartProduct, langs } from '../../types/common'
import Link from 'next/link'
import Image from 'next/image'
import { RemoveIcon } from '../Icons'

const DrawerProduct = React.memo(function DrawerProduct({
  prod,
  lang,
}: {
  prod: CartProduct
  lang: keyof CartProduct
}) {
  const title = ('title_' + lang) as keyof CartProduct
  const desc = ('description_' + lang) as keyof CartProduct

  return (
    <div className='flex mt-4 mx-1 no-underline'>
      <Link href={`/products/${prod.id}`} className=''>
        <Image
          src={prod.images[0]}
          width={80}
          height={80}
          /* @ts-ignore  ===> I know it will always be defined!!!!!!!! */
          alt={prod[lang][title]}
        />
      </Link>
      <div className='ml-2 flex flex-col justify-around'>
        <p className='font-fancy'>
          {/* @ts-ignore */}
          {prod[lang][title]} - {prod.price}€
        </p>
        <div className='flex'>
          <table
            className='border-collapse w-24 text-center rounded-sm border-hidden shadow-sm shadow-cyan-200'
            style={{ boxShadow: '0 0 0 1px rgb(165 243 252)' }}
          >
            <tbody>
              <tr>
                <td className='border py-1 px-2 cursor-pointer border-cyan-200'>
                  -
                </td>
                <td className='border py-1 px-2 cursor-pointer border-cyan-200'>
                  {prod.q}
                </td>
                <td className='border py-1 px-2 cursor-pointer border-cyan-200'>
                  +
                </td>
              </tr>
            </tbody>
          </table>
          <span className='h-8 cursor-pointer ml-2'>
            <RemoveIcon styleClasses='w-full h-full' />
          </span>
        </div>
      </div>
    </div>
  )
})

export default DrawerProduct

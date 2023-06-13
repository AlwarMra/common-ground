import React from 'react'
import { CartProduct } from '../../types/common'
import Link from 'next/link'
import Image from 'next/image'
import { RemoveIcon } from '../Icons'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { cartActionsType } from '../../store/cart'

interface IProps {
  prod: CartProduct
  lang: keyof CartProduct
  actions: cartActionsType
}

const DrawerProduct = React.memo(function DrawerProduct({
  prod,
  lang,
  actions,
}: IProps) {
  const title = ('title_' + lang) as keyof CartProduct
  const dispatch = useAppDispatch()
  return (
    <div className='grid grid-cols-1-2 items-end mt-4 mx-1 no-underline md:gap-4'>
      <Link href={`/products/${prod.id}`} className=''>
        <Image
          src={prod.images[0]}
          width={80}
          height={80}
          className='w-20 h-20 md:w-24 md:h-24 '
          /* @ts-ignore  ===> I know it will always be defined!!!!!!!! */
          alt={prod[lang][title]}
        />
      </Link>
      <div className='ml-2 flex flex-col gap-2 justify-around'>
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
                <td
                  className='border py-1 px-2 cursor-pointer border-cyan-200'
                  onClick={() => dispatch(actions.substractFromCart(prod))}
                >
                  -
                </td>
                <td className='border py-1 px-2 cursor-pointer border-cyan-200'>
                  {prod.q}
                </td>
                <td
                  className='border py-1 px-2 cursor-pointer border-cyan-200'
                  onClick={() => dispatch(actions.addToCart({ ...prod, q: 1 }))}
                >
                  +
                </td>
              </tr>
            </tbody>
          </table>
          <span
            className='h-8 cursor-pointer ml-2'
            onClick={() => dispatch(actions.removeFromCart(prod))}
          >
            <RemoveIcon styleClasses='w-full h-full' />
          </span>
        </div>
      </div>
    </div>
  )
})

export default DrawerProduct

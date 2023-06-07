import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '../../../types/common'
import { getAllProducts } from '../../../firebase/clientApp'

const DashboardProducts = () => {
  const [products, setProducts] = useState<any>([])

  useEffect(() => {
    getAllProducts().then(prods => {
      setProducts(prods)
    })
  }, [])

  return (
    <div className='p-4 mt-4'>
      <div className='flex justify-between mb-8'>
        <h3 className='font-bold text-lg'>All products</h3>
        <Link
          href='/dashboard/products/new-product'
          className='inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out mb-3'
          style={{
            background:
              'linear-gradient(to right,#bae6fd,#93c5fd,#5eead4,#6ee7b7)',
          }}
        >
          Add new product
        </Link>
      </div>
      <div className=''>
        {products &&
          products?.map((prod: Product) => (
            <Link
              key={prod.id}
              href={`/dashboard/products/${prod.id}`}
              className='flex justify-between items-center p-2 pr-8 odd:bg-white even:bg-slate-50 first:border-t-2 border-b-2 hover:bg-slate-100'
            >
              <div className=' flex items-center gap-4'>
                <Image
                  src={prod.images[0]}
                  alt={prod.es.title_es}
                  width={100}
                  height={100}
                  style={{ objectFit: 'cover' }}
                />
                <p className='text-lg'>{prod.es.title_es}</p>
              </div>
              <p>{prod.price}€</p>
            </Link>
          ))}
      </div>
    </div>
  )
}

export default DashboardProducts

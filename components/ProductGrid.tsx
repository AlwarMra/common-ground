import React from 'react'
import ProductCard from './ProductCard'
import { Product, langs } from 'types/common'

interface ProductGridProps {
  prods: Product[]
  lang: langs
}

const ProductGrid = ({ prods, lang }: ProductGridProps) => {
  return (
    <section className='my-36 bg-white py-6 px-4'>
      <h2 className='font-fancy text-2xl text-center text-bold'>
        Our products
      </h2>
      <div className='md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16'>
        {prods.map((prod, index) => (
          <ProductCard
            key={prod.id}
            lang={lang.toString() as keyof Product}
            prod={prod}
            index={index}
          />
        ))}
      </div>
    </section>
  )
}

export default ProductGrid

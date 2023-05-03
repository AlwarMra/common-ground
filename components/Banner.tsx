import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import img_1 from '../public/imgs/banner_img_1.jpg'
import img_2 from '../public/imgs/banner_img_2.jpg'

const Banner = () => {
  const [skew, setSkew] = useState<Number>()
  const container = useRef<HTMLDivElement>(null)

  const calculateSkew = (elem: React.RefObject<HTMLDivElement>) => {
    if (elem.current) {
      const arctang = Math.atan2(
        elem.current.offsetHeight,
        elem.current.offsetWidth,
      )
      const n = parseFloat(Number(90 - arctang * (180 / Math.PI)).toFixed(2))
      setSkew(n)
    }
  }
  useEffect(() => {
    calculateSkew(container)
    window.addEventListener('resize', () => {
      calculateSkew(container)
    })
  }, [])

  return (
    <section className='relative mt-8'>
      <div className='absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 bg-white z-10 p-4 rounded-sm'>
        <h1 className='text-center bold font-fancy text-xl md:text-3xl mb-4'>
          Dub music for life
        </h1>
        <p className='md:text-lg text-center'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium,
          adipisci?
        </p>
      </div>
      <div
        ref={container}
        className='overflow-hidden relative w-full h-vw max-h-[40em] m-auto rounded-sm'
      >
        <div
          className={`w-full h-full overflow-hidden absolute  -left-1`}
          style={{ transformOrigin: '100% 0', transform: `skewX(-${skew}deg)` }}
        >
          <Image
            src={img_1}
            className='w-full h-full object-cover hue-rotate-[300deg]'
            style={{
              transformOrigin: 'inherit',
              transform: `skewX(${skew}deg)`,
            }}
            alt=''
          />
        </div>
        <div
          className={`w-full h-full overflow-hidden absolute  -right-1`}
          style={{ transformOrigin: '0 100%', transform: `skewX(-${skew}deg)` }}
        >
          <Image
            src={img_2}
            className='w-full h-full  object-cover '
            style={{
              transformOrigin: 'inherit',
              transform: `skewX(${skew}deg)`,
            }}
            alt=''
          />
        </div>
      </div>
    </section>
  )
}

export default Banner

import Link from 'next/link'
import React from 'react'
import { InstagramIcon, TwitterIcon } from './Icons'
import Image from 'next/image'
import footer_img from '../public/imgs/footer.png'
const Footer: React.FC = () => {
  const year = new Date().getFullYear()

  return (
    <footer className='bg-amber-200 mt-16 lg:grid lg:grid-cols-5 relative before:w-full before:absolute before:bg-auto before:bg-no-repeat'>
      <div className='relative block h-32 lg:col-span-2 lg:h-full'>
        <Image
          className='absolute inset-0 h-full w-full object-cover'
          src={footer_img}
          alt='footer image'
          width='500'
          height={500}
        />
      </div>

      <div className='px-4 py-16 sm:px-6 lg:col-span-3 lg:px-8'>
        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2'>
          <div>
            <p>
              <span className='text-xs uppercase tracking-wide text-gray-700'>
                Call us
              </span>

              <a
                href='#'
                className='block text-2xl font-medium text-gray-900 hover:opacity-75 sm:text-3xl'
              >
                0123456789
              </a>
            </p>

            <ul className='mt-8 space-y-1 text-sm'>
              <li>Monday to Friday: 10am - 5pm</li>
              <li>Weekend: 10am - 3pm</li>
            </ul>

            <ul className='mt-8 flex gap-6'>
              <li>
                <Link href='/' className='transition hover:opacity-75'>
                  <span className='sr-only'>Instagram</span>
                  <InstagramIcon />
                </Link>
              </li>
              <li>
                <Link
                  href=''
                  className='text-gray-700 transition hover:opacity-75'
                >
                  <span className='sr-only'>Twiiter</span>
                  <TwitterIcon />
                </Link>
              </li>
            </ul>
          </div>

          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            <div>
              <p className='font-semibold'>Common Ground</p>

              <ul className='mt-6 space-y-4 text-sm'>
                <li>
                  <Link href='/about' className='transition hover:opacity-75'>
                    About
                  </Link>
                </li>
                <li>
                  <Link href='/contact' className='transition hover:opacity-75'>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href='/services'
                    className='transition hover:opacity-75'
                  >
                    Party services
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className='mt-12 border-t border-amber-600 pt-12'>
          <div className='sm:flex sm:items-center sm:justify-between'>
            <ul className='flex flex-wrap gap-4 text-xs'>
              <li>
                <Link
                  href='/terms-conditions'
                  className='transition hover:opacity-75'
                >
                  Terms & Conditions
                </Link>
              </li>

              <li>
                <Link
                  href='/privacy-policy'
                  className='transition hover:opacity-75'
                >
                  Privacy policy
                </Link>
              </li>

              <li>
                <Link href='/cookies' className='transition hover:opacity-75'>
                  Cookies
                </Link>
              </li>
            </ul>

            <p className='mt-8 text-xs sm:mt-0'>
              &copy; {year} Common Ground. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

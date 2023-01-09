import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { CartIcon, UserIcon, MenuIcon, CloseIcon } from './Icons'

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className='relative bg-white'>
      <div className='mx-auto max-w-7xl px-6'>
        <div className='grid grid-cols-1/3-center items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10'>
          <div className='-my-2 -mr-2 '>
            <button
              type='button'
              className='md:hidden inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className='sr-only'>Open menu</span>
              <MenuIcon />
            </button>
          </div>
          <div className='flex justify-center lg:flex-1'>
            <Link href='#' className='flex items-center'>
              <span className='mirror__text'>Common</span>
              <Image
                src='/logo.png'
                alt='Commonground Logo'
                width={50}
                height={12}
                priority
              />
              <span>Ground</span>
            </Link>
          </div>

          <div className='items-center justify-end flex md:flex-1'>
            <Link
              href='/login'
              className=' inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-100'
            >
              <UserIcon />
            </Link>
            <Link
              href='/'
              className=' inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-100'
            >
              <CartIcon />
            </Link>
          </div>
        </div>

        <nav className='hidden space-x-10 md:flex justify-center gap-4 border-b-2 border-gray-100 py-4'>
          <div className='relative'>
            {/* <!-- Item active: "text-gray-900", Item inactive: "text-gray-500" --> */}
            <button
              type='button'
              className='text-gray-500 group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              aria-expanded='false'
            >
              <span>Solutions</span>
              {/* <!--
              Heroicon name: mini/chevron-down

              Item active: "text-gray-600", Item inactive: "text-gray-400"
            --> */}
              <svg
                className='text-gray-400 ml-2 h-5 w-5 group-hover:text-gray-500'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </div>

          <a
            href='#'
            className='text-base font-medium text-gray-500 hover:text-gray-900'
          >
            Pricing
          </a>
          <a
            href='#'
            className='text-base font-medium text-gray-500 hover:text-gray-900'
          >
            Docs
          </a>

          <div className='relative'>
            {/* <!-- Item active: "text-gray-900", Item inactive: "text-gray-500" --> */}
            <button
              type='button'
              className='text-gray-500 group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
              aria-expanded='false'
            >
              <span>More</span>
              {/* <!--
              Heroicon name: mini/chevron-down

              Item active: "text-gray-600", Item inactive: "text-gray-400"
            --> */}
              <svg
                className='text-gray-400 ml-2 h-5 w-5 group-hover:text-gray-500'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                aria-hidden='true'
              >
                <path
                  fillRule='evenodd'
                  d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
                  clipRule='evenodd'
                />
              </svg>
            </button>

            {/* <!--
            'More' flyout menu, show/hide based on flyout menu state.

            Entering: "transition ease-out duration-200"
              From: "opacity-0 translate-y-1"
              To: "opacity-100 translate-y-0"
            Leaving: "transition ease-in duration-150"
              From: "opacity-100 translate-y-0"
              To: "opacity-0 translate-y-1"
          --> */}
          </div>
        </nav>
      </div>

      {/* <!--
    Mobile menu, show/hide based on mobile menu state.

    Entering: "duration-200 ease-out"
      From: "opacity-0 scale-95"
      To: "opacity-100 scale-100"
    Leaving: "duration-100 ease-in"
      From: "opacity-100 scale-100"
      To: "opacity-0 scale-95"
  --> */}
      <div
        className='scale-95 opacity-0 mobile__menu absolute inset-x-0 top-0 origin-top-left transform p-2 transition md:hidden'
        aria-expanded={mobileMenuOpen}
      >
        <div className='divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5'>
          <div className='px-5 pt-5 pb-6'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <Image
                  src='/logo.png'
                  alt='Commonground Logo'
                  width={50}
                  height={12}
                  priority
                />
                <p>CommonGround</p>
              </div>
              <div className='-mr-2'>
                <button
                  type='button'
                  className='inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className='sr-only'>Close menu</span>
                  <CloseIcon />
                </button>
              </div>
            </div>
            <div className='mt-6'>
              <nav className='grid gap-y-8'>
                <Link
                  href='#'
                  className='-m-3 flex items-center rounded-md p-3 hover:bg-gray-50'
                >
                  <span className='ml-3 text-base font-medium text-gray-900'>
                    Analytics
                  </span>
                </Link>

                <Link
                  href='#'
                  className='-m-3 flex items-center rounded-md p-3 hover:bg-gray-50'
                >
                  <span className='ml-3 text-base font-medium text-gray-900'>
                    Engagement
                  </span>
                </Link>

                <Link
                  href='#'
                  className='-m-3 flex items-center rounded-md p-3 hover:bg-gray-50'
                >
                  <span className='ml-3 text-base font-medium text-gray-900'>
                    Security
                  </span>
                </Link>

                <Link
                  href='#'
                  className='-m-3 flex items-center rounded-md p-3 hover:bg-gray-50'
                >
                  <span className='ml-3 text-base font-medium text-gray-900'>
                    Integrations
                  </span>
                </Link>

                <Link
                  href='#'
                  className='-m-3 flex items-center rounded-md p-3 hover:bg-gray-50'
                >
                  <span className='ml-3 text-base font-medium text-gray-900'>
                    Automations
                  </span>
                </Link>
              </nav>
            </div>
          </div>
          <div className='space-y-6 py-6 px-5'>
            <div className='grid grid-cols-2 gap-y-4 gap-x-8'>
              <a
                href='#'
                className='text-base font-medium text-gray-900 hover:text-gray-700'
              >
                Pricing
              </a>

              <a
                href='#'
                className='text-base font-medium text-gray-900 hover:text-gray-700'
              >
                Docs
              </a>

              <a
                href='#'
                className='text-base font-medium text-gray-900 hover:text-gray-700'
              >
                Help Center
              </a>

              <a
                href='#'
                className='text-base font-medium text-gray-900 hover:text-gray-700'
              >
                Guides
              </a>

              <a
                href='#'
                className='text-base font-medium text-gray-900 hover:text-gray-700'
              >
                Events
              </a>

              <a
                href='#'
                className='text-base font-medium text-gray-900 hover:text-gray-700'
              >
                Security
              </a>
            </div>
            <div>
              <a
                href='#'
                className='flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700'
              >
                Sign up
              </a>
              <p className='mt-6 text-center text-base font-medium text-gray-500'>
                Existing customer?
                <a href='#' className='text-indigo-600 hover:text-indigo-500'>
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header

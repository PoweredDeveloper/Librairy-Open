'use client'

import logo from '@/src/assets/images/logo/Logo.svg'
import Banner from '@/src/components/Banner/Banner'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { useState, ReactElement } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { usePathname } from 'next/navigation'
import { BiTrendingUp, BiHome, BiMoney } from 'react-icons/bi'
import { IoLibraryOutline } from 'react-icons/io5'
import { MdOutlineCollectionsBookmark, MdLogin } from 'react-icons/md'
import { AiOutlineRead } from 'react-icons/ai'

const links: Array<[string, ReactElement<any, any>, string]> = [
  ['Главная', <BiHome />, '/'],
  ['Библиотека', <IoLibraryOutline />, '/library'],
  ['Коллекции', <MdOutlineCollectionsBookmark />, '/collections'],
  ['Восходящее', <BiTrendingUp />, '/trending'],
  ['Premium', <BiMoney />, '/premium']
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <nav className="md:bg-transparent bg-brown-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Image className="h-8 w-8" src={logo} alt="Librairy logo" />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-8">
                  {links.map(([title, icon, link]) => (
                    <div className="underline-button" key={uuidv4()}>
                      <Link
                        className="flex flex-row gap-2 items-center"
                        href={link}
                      >
                        {icon}
                        {title}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <div className="relative ml-3">
                  <Link href="/login" className="hover-button mr-5">
                    Вход
                    {/* Sign In */}
                  </Link>
                  <Link href="register" className="accent-button">
                    Регистрация
                    {/* Sign Up */}
                  </Link>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                type="button"
                className="relative inline-flex items-center transition-color justify-center rounded-md bg-transparent p-2 text-brown-900 hover:bg-brown-400 hover:text-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                <svg
                  className={clsx('h-6 w-6', {
                    hidden: mobileMenuOpen,
                    block: !mobileMenuOpen
                  })}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                <svg
                  className={clsx('h-6 w-6', {
                    hidden: !mobileMenuOpen,
                    block: mobileMenuOpen
                  })}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className={clsx('md:hidden', { hidden: !mobileMenuOpen })}>
          <div className="space-y-1 border-t border-brown-600 px-2 pb-3 pt-2 sm:px-3">
            {links.map(([title, icon, link]) => (
              <div
                className={clsx(
                  'py-2 px-4 rounded-lg text-brown-900 text-center',
                  {
                    'bg-orange-300 text-white': pathname === link
                  }
                )}
                key={uuidv4()}
              >
                <Link
                  className="flex flex-row gap-2 items-center"
                  onClick={() => setMobileMenuOpen(false)}
                  href={link}
                >
                  {icon}
                  {title}
                </Link>
              </div>
            ))}
          </div>
          <div className="border-t border-brown-700 px-3 py-3 flex flex-row w-full gap-3 items-center justify-around">
            <Link
              href="/login"
              className="accent-button rounded-lg bg-brown-200 hover:bg-brown-300 text-brown-900 flex gap-2 items-center w-1/2"
            >
              <MdLogin className="mt-0.5" />
              Вход
              {/* Sign In */}
            </Link>
            <Link
              href="register"
              className="accent-button rounded-lg flex gap-2 items-center w-1/2"
            >
              <AiOutlineRead className="mt-0.5" />
              Регистрация
              {/* Sign Up */}
            </Link>
          </div>
        </div>
      </nav>
      <Banner />
    </>
  )
}

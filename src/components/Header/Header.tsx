'use client'

import logo from '@/src/assets/images/logo/Logo.svg'
import Banner from '@/src/components/Banner/Banner'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { ReactElement } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { usePathname } from 'next/navigation'
import { BiTrendingUp, BiHome, BiUserCircle, BiSearch } from 'react-icons/bi'
import { IoLibraryOutline } from 'react-icons/io5'
import { MdOutlineCollectionsBookmark } from 'react-icons/md'

interface IHeaderButtonType {
  title: string
  icon: ReactElement<any, any>
  link: string
  mobileOnly: boolean
}

const links: Array<IHeaderButtonType> = [
  { title: 'Главная', icon: <BiHome />, link: '/', mobileOnly: false },
  {
    title: 'Библиотека',
    icon: <IoLibraryOutline />,
    link: '/library',
    mobileOnly: false
  },
  {
    title: 'Коллекции',
    icon: <MdOutlineCollectionsBookmark />,
    link: '/collections',
    mobileOnly: false
  },
  {
    title: 'Восходящее',
    icon: <BiTrendingUp />,
    link: '/trending',
    mobileOnly: false
  }
]

export default function Header() {
  const pathname = usePathname()

  return (
    <>
      <nav className="md:bg-transparent border-b border-brown-400">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Image className="h-8 w-8" src={logo} alt="Librairy logo" />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-8">
                  {links.map((button: IHeaderButtonType) => (
                    <div
                      className={clsx('underline-button', {
                        'scale-x-[1]': button.link === pathname
                      })}
                      key={uuidv4()}
                    >
                      <Link
                        className="flex flex-row gap-2 items-center"
                        href={button.link}
                      >
                        {button.icon}
                        {button.title}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='md:hidden flex items-center justify-end gap-5'>
              <BiSearch className="text-2xl" />
              <BiUserCircle className="text-2xl" />
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
          </div>
        </div>
        <div className="md:hidden bg-brown-50 fixed bottom-0 w-full">
          <div className="border-t border-brown-600 flex flex-row items-center justify-around px-2 py-3 sm:px-3">
            {links.map((button: IHeaderButtonType) => (
              <div
                className={clsx('p-3 rounded-full text-brown-900 text-center', {
                  'bg-orange-400 text-white': pathname === button.link
                })}
                key={uuidv4()}
              >
                <Link
                  className="text-[22px]"
                  href={button.link}
                  title={button.title}
                >
                  {button.icon}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </nav>
      <Banner />
    </>
  )
}

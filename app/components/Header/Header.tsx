'use client'

import logo from '@/app/assets/images/logo/Logo.svg'
import Banner from '@/app/components/Header/AdvertismentBannerHeader'
import {
  User,
  createClientComponentClient
} from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useCallback, useState, useEffect } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import { v4 as uuidv4 } from 'uuid'
import { usePathname } from 'next/navigation'
import { BiHome, BiUserCircle, BiScan } from 'react-icons/bi'
import { FaBars, FaChevronDown } from 'react-icons/fa'
import { LuTextSelect } from 'react-icons/lu'
import { IoLibraryOutline } from 'react-icons/io5'
import {
  MdOutlineCollectionsBookmark,
  MdOutlineTranslate
} from 'react-icons/md'
import { FaX } from 'react-icons/fa6'
import { IconType } from 'react-icons'
import React from 'react'
import { Database } from '@/types/supabase'
import downloadUserProfileImage from '@/app/utils/user/downloadUserProfileImageClient'

type HeaderButtonType = {
  title: string
  icon: IconType
  link: string
}

type HeaderButtonOptionsType = {
  name: string
  description: string
  href: string
  icon: IconType
}

type Props = {
  user: User | null
}

const links: Array<HeaderButtonType> = [
  { title: 'Главная', icon: BiHome, link: '/' },
  {
    title: 'Библиотека',
    icon: IoLibraryOutline,
    link: '/library'
  },
  {
    title: 'Коллекции',
    icon: MdOutlineCollectionsBookmark,
    link: '/collections'
  }
]

const products: Array<HeaderButtonOptionsType> = [
  {
    name: 'Перевести',
    description: 'Переводит книгу на любой из 6-ти языков!',
    href: '#',
    icon: MdOutlineTranslate
  },
  {
    name: 'Сократить',
    description: 'Кратко рассказывает о чем книга, глава',
    href: '#',
    icon: LuTextSelect
  },
  {
    name: 'Сканировать',
    description: 'Переводит из фото в текст с помощью OCR',
    href: '#',
    icon: BiScan
  }
]

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Header({ user }: Props) {
  const supabase = createClientComponentClient<Database>()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | null>()
  const pathname = usePathname()

  const getProfile = useCallback(async () => {
    try {
      if (!user) {
        throw new Error('User is not defined!')
      }

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('id', user?.id)
        .single()

      if (data) {
        setAvatarUrl(data.avatar_url)
      }

      if (error && status !== 406) {
        throw error
      }
    } catch (error) {
      alert(error)
    }
  }, [user, supabase])

  useEffect(() => {
    if (avatarUrl)
      downloadUserProfileImage(avatarUrl).then((result) => setAvatarUrl(result))
  }, [avatarUrl, supabase])

  return (
    <>
      <header className="bg-white">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Librairy</span>
              <Image className="h-8 w-auto" src={logo} alt="" />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-brown-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Открыть главное меню</span>
              <FaBars className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <Popover.Group className="hidden lg:flex lg:gap-x-12">
            {links.map((link: HeaderButtonType) => (
              <Link
                href={link.link}
                className="text-sm font-semibold leading-6 text-brown-900 underline-button"
                key={uuidv4()}
              >
                {link.title}
              </Link>
            ))}
            <Popover className="relative">
              <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 outline-none text-brown-900 underline-button">
                Инструменты
                <FaChevronDown
                  className="h-5 w-5 flex-none text-brown-400"
                  aria-hidden="true"
                />
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-brown-900/5">
                  <div className="p-4">
                    {products.map((item: HeaderButtonOptionsType) => (
                      <div
                        key={item.name}
                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-brown-50"
                      >
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-brown-50 group-hover:bg-white">
                          <item.icon
                            className="h-6 w-6 text-brown-600 group-hover:text-orange-600"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="flex-auto">
                          <Link
                            href={item.href}
                            className="block font-semibold text-brown-900"
                          >
                            {item.name}
                            <span className="absolute inset-0" />
                          </Link>
                          <p className="mt-1 text-brown-600">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
          </Popover.Group>
          <div
            className={classNames(
              'lg:flex lg:flex-1 lg:justify-end ml-2',
              user != null ? 'hidden' : 'block'
            )}
          >
            <Link href="/signup" className="mr-2 button accent-button">
              Зарегестрироваться
            </Link>
            <Link href="/signin" className="button hover-button">
              Войти
            </Link>
          </div>
          <div
            className={classNames(
              'lg:flex lg:flex-1 lg:justify-end',
              user != null ? 'block' : 'hidden'
            )}
          >
            {avatarUrl ? (
              <Image src={avatarUrl} alt="user avatar" />
            ) : (
              <BiUserCircle className="text-xl" />
            )}
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-brown-900/10">
            <div className="flex items-center justify-between">
              <Link href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Librairy</span>
                <Image className="h-8 w-auto" src={logo} alt="" />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-brown-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Закрыть меню</span>
                <FaX className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-brown-500/10">
                <div className="space-y-2 py-6">
                  {links.map((link: HeaderButtonType) => (
                    <Link
                      onClick={() => setMobileMenuOpen(false)}
                      href={link.link}
                      className="-mx-3 rounded-lg px-3 py-2 flex flex-row items-center justify-start text-base font-semibold leading-7 text-brown-900 hover:bg-brown-50"
                      key={uuidv4()}
                    >
                      <link.icon className="text-xl" />
                      {link.title}
                    </Link>
                  ))}
                  <Disclosure as="div" className="-mx-3">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-brown-900 hover:bg-brown-50">
                          Инструменты
                          <FaChevronDown
                            className={classNames(
                              open ? 'rotate-180' : '',
                              'h-5 w-5 flex-none'
                            )}
                            aria-hidden="true"
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-2 space-y-2">
                          {[...products].map(
                            (item: HeaderButtonOptionsType) => (
                              <Disclosure.Button
                                key={item.name}
                                as="a"
                                href={item.href}
                                className="flex flex-row items-center justify-start rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-brown-900 hover:bg-brown-50"
                              >
                                <item.icon className="text-lg" />
                                {item.name}
                              </Disclosure.Button>
                            )
                          )}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </div>
                <div className="py-4 flex flex-row items-center justify-around gap-3">
                  <Link
                    onClick={() => setMobileMenuOpen(false)}
                    href="/signup"
                    className="transition-colors -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-orange-500 bg-orange-400 w-1/2 text-center"
                  >
                    Регистрация
                  </Link>
                  <Link
                    onClick={() => setMobileMenuOpen(false)}
                    href="/signin"
                    className="transition-colors -mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-brown-900 bg-brown-50 hover:bg-brown-100 w-1/2 text-center"
                  >
                    Вход
                  </Link>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
      <Banner />
    </>
  )
}

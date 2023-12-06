'use client'

import Banner from '@/app/components/Header/AdvertismentBannerHeader'
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid'

interface IHeaderButtonType {
  title: string
  link: string
}

const links: Array<IHeaderButtonType> = [
  { title: 'Главная', link: '/' },
  {
    title: 'Библиотека',
    link: '/library'
  },
  {
    title: 'Коллекции',
    link: '/collections'
  },
  {
    title: 'Восходящее',
    link: '/trending'
  },
  {
    title: 'Premium',
    link: '/premium'
  }
]

export default function Header() {
  return (
    <>
      <header>
        {links.map((link: IHeaderButtonType) => (
          <Link href={link.link} key={uuidv4()}>
            {link.title}
          </Link>
        ))}
        <Link href="/auth/login">Войти</Link>
      </header>
      <Banner />
    </>
  )
}

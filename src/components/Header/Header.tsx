'use client'

import logo from '@/src/assets/images/logo/Logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { BiTrendingUp } from 'react-icons/bi'

const links: Array<[string, string]> = [
  ['Home', '/'],
  ['Library', '/library'],
  ['Collections', '/collections'],
  ['Trending', '/trending']
]

export default function Header() {
  const pathname = usePathname()
  return (
    <header
      className={clsx(
        'absolute top-0 w-full flex justify-between items-center bg-transparent border-b border-[#d1c6b9] max-h-[112px] transition-all',
        {
          'p-2': pathname != '/',
          'p-9': pathname == '/'
        }
      )}
    >
      <div className="flex flex-row items-center gap-14">
        <Image src={logo} alt="Librairy logo" height={40} width={40} />
        <ul className="flex justify-center items-center gap-20">
          {links.map(([title, link], index) => (
            <li
              className={clsx('underline-button flex gap-1', {
                'after:scale-x-[1]': pathname === link
              })}
              key={index}
            >
              <Link href={link}>{title}</Link>
              {index != links.length - 1 || <BiTrendingUp />}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Link href="/login" className="hover-button mr-5">
          Sign In
        </Link>
        <Link href="register" className="button accent-button">
          Sign Up
        </Link>
      </div>
    </header>
  )
}

import logo from '@/src/assets/images/logo/Logo.svg'
import Image from 'next/image'
import Link from 'next/link'

const links: Array<[string, string]> = [
  ['Main', '/'],
  ['Library', '/library'],
  ['Collections', '/collections'],
  ['News', '/news']
]

export default function Header() {
  return (
    <header className="bg-transparent flex justify-between items-center p-4 bg-blur">
      <div className="flex flex-row items-center gap-14">
        <Image src={logo} alt="Librairy logo" height={40} width={40} />
        <ul className="flex justify-center items-center gap-20">
          {links.map(([title, link], index) => (
            <li className="underline-button" key={index}>
              <Link href={link}>{title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <span className="hover-button mr-5">Sign In</span>
        <span className="button accent-button">Sign Up</span>
      </div>
    </header>
  )
}

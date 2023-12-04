import getBookListData from '@/src/assets/lib/utils/getBookListData'
import { Metadata } from "next"
import Link from "next/link"
import {v4 as uuidv4} from 'uuid'

interface BookObject {
  isbn: string,
  title: string,
  subtitle: string,
  author: string,
  published: string,
  pages: number,
  description: string,
  website: string
}

export const metadata: Metadata = {
  title: "Librairy | Библиотека"
}

export default async function Page() {
  const books: BookObject[] = (await getBookListData()).books
  return (
  <>
    <h1 className="text-brown-900 text-3xl mb-4">Library</h1>
    <ul className='flex flex-col gap-2'>
      {books.map((book: BookObject) => (
        <Link className='hover:underline' href={`/library/${book.isbn}`} key={uuidv4()}>{book.title}</Link>
      ))}
    </ul>
  </>
  )
}

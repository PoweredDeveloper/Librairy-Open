import getBookListData from '@/src/assets/lib/utils/getBookListData'
import { Metadata } from "next"
import Link from "next/link"
import {v4 as uuidv4} from 'uuid'

export const metadata: Metadata = {
  title: "Librairy | Библиотека"
}

export default async function Page() {
  const books = await getBookListData()
  return (
  <>
    <h1 className="text-brown-900 text-3xl mb-4">Library</h1>
    <ul className='flex flex-col gap-2'>
      {books.books.map((book: any) => (
        <Link className='hover:underline' href={`/library/${book.isbn.toString()}`} key={uuidv4()}>{book.title.toString()}</Link>
      ))}
    </ul>
  </>
  )
}

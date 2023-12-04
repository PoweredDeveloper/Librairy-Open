import '@/src/assets/lib/utils/getBookListData'
import getBookObjectFromId from '@/src/assets/lib/utils/getBookObjectFromId'
import { v4 as uuidv4 } from 'uuid'

type Props = {
    params: {
        book_id: string
    }
}

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

export async function generateMetadata({ params: {book_id}}: Props) {
    const book: BookObject = await getBookObjectFromId(book_id)
    return {
        title: book.title
    }
}

export default async function BookPage({params: { book_id }}: Props) {
    const book: [string, string | number][] = Object.entries(await getBookObjectFromId(book_id))
    return (
        <div className='flex gap-2 flex-col'>
            {book.map(parameter => <span key={uuidv4()}>{`${parameter[0]}: ${parameter[1]}`}</span>)}
        </div>
    )
}
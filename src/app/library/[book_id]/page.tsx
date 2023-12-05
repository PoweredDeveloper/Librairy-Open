type Props = {
  params: {
    book_id: string
  }
}

export async function generateMetadata({ params: { book_id } }: Props) {
  return {
    title: book_id
  }
}

export default async function BookPage({ params: { book_id } }: Props) {
  return <div>Book {book_id}</div>
}

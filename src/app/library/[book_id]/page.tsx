type Props = {
  book_id: string
}

export default function BookPage({ book_id }: Props) {
  return <h1>{book_id}</h1>
}

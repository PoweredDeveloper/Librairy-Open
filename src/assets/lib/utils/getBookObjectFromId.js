import getBookListData from '@/src/assets/lib/utils/getBookListData'

export default async function getBookObjectFromId(id) {
    const bookList = await getBookListData()
    return bookList.books.find(book => book.isbn == id)
}
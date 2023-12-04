const bookListLink = process.env.BOOK_LIST_JSON_LINK;

export default async function getBookListData() {
    const response = await fetch(bookListLink)
    return response.json()
  }
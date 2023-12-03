import { BiSearch } from 'react-icons/bi'

export default function Page() {
  return (
    <div className="flex justify-start items-center h-screen">
      <div className="ml-36">
        <h1 className="text-brown-900 text-6xl font-thin font-serif">
          Librairy:
          <br />
          Откройте для себя мир книг с AI
        </h1>
        <h4 className="text-brown-500 text-lg font-thin mt-4 mb-8">
          Искусственный интеллект в вашей библиотеке
        </h4>
        <div className="flex items-center border border-brown-100 bg-white rounded-full w-min">
          <input
            className="text-brown-900 px-4 py-2 text-base font-extralight outline-none bg-white rounded-r-none rounded-full"
            type="text"
            placeholder="Введите название книги"
          />
          <BiSearch className="text-xl mr-3 my-2" />
        </div>
      </div>
    </div>
  )
}

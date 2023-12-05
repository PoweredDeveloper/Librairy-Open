import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Librairy | Главная',
  description: 'The main page of Librairy website'
}

export default function Page() {
  return <h1>Hello</h1>
}

/* <div className="bg-white">
<div className="relative isolate px-6 pt-14 lg:px-8">
  <div
    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
    aria-hidden="true"
  >
    <div
      className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
      style={{
        clipPath:
          'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
      }}
    />
  </div>
  <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
    <div className="text-center">
      <h1 className="text-4xl font-bold tracking-tight text-brown-900 sm:text-6xl">
        Data to enrich your online business
      </h1>
      <p className="mt-6 text-lg leading-8 text-brown-600">
        Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
        fugiat veniam occaecat fugiat aliqua.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <a
          href="#"
          className="rounded-md bg-orange-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
        >
          Get started
        </a>
        <a href="#" className="text-sm font-semibold leading-6 text-brown-900">
          Learn more <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  </div>
  <div
    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
    aria-hidden="true"
  >
    <div
      className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
      style={{
        clipPath:
          'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
      }}
    />
  </div>
</div>
</div> */

// <div className="flex justify-start items-center h-screen">
//   <div className="ml-36">
//     <h1 className="text-brown-900 text-6xl sm:text-2xl font-thin font-serif">
//       Librairy:
//       <br />
//       Откройте для себя мир книг с AI
//     </h1>
//     <h4 className="text-brown-500 text-lg font-thin mt-4 mb-8">
//       Искусственный интеллект в вашей библиотеке
//     </h4>
//     <div className="flex items-center border sm:hidden block border-brown-100 bg-white rounded-full w-min">
//       <input
//         className="text-brown-900 px-4 py-2 text-base font-extralight outline-none bg-white rounded-r-none rounded-full"
//         type="text"
//         placeholder="Введите название книги"
//       />
//       <BiSearch className="text-xl mr-3 my-2" />
//     </div>
//   </div>
// </div>
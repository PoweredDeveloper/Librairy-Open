import { Metadata } from 'next'
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa6';

export const metadata: Metadata = {
  title: 'Librairy | Главная',
  description: 'The main page of Librairy website'
}

export default function Page() {
  return (
    <div className='flex md:justify-between justify-center items-center flex-auto'>
      <div className='flex flex-col items-center md:items-start gap-3 md:ml-16 lg:ml-32'>
          <Link href='/premium' className='mb-2 px-2 py-0.5 text-sm flex gap-2 lg:hidden items-center rounded-full border cursor-pointer border-brown-900 bg-brown-50 text-brown-900'>Получите премиум бесплатно!<FaArrowRight /></Link>
          <h1 className='md:text-left text-center text-brown-900 md:text-5xl lg:text-7xl text-4xl font-bold'>
            Приобретите <span className='text-orange-400'>свою</span><br />
            Любимую <span className='text-orange-400'>книгу</span><br />
            Здесь!
          </h1>
          <p className='mt-3 text-center lg:text-left text-brown-900'>Онлайн библиотека уже с ИИ.<span className='block sm:hidden'>Испытайте чтение по новому</span></p>
          <Link href='/signup' className='accent-button flex items-center px-4 md:p-2 gap-3 mt-4 md:mt-8 lg:mt-14 w-min'>
            <span>Начать</span>
            <FaArrowRight className='block lg:hidden' />
            <svg className='hidden lg:block' width="96" height="16" viewBox="0 0 96 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M95.7071 8.70711C96.0976 8.31658 96.0976 7.68342 95.7071 7.29289L89.3431 0.928932C88.9526 0.538408 88.3195 0.538408 87.9289 0.928932C87.5384 1.31946 87.5384 1.95262 87.9289 2.34315L93.5858 8L87.9289 13.6569C87.5384 14.0474 87.5384 14.6805 87.9289 15.0711C88.3195 15.4616 88.9526 15.4616 89.3431 15.0711L95.7071 8.70711ZM0 9H95V7H0V9Z" fill="white"/>
            </svg>
          </Link>
      </div>
      <div className='relative overflow-hidden hidden lg:block'>
        <div className='absolute bottom-0 right-0 w-12 aspect-square bg-[radial-gradient(circle at 100% bottom, rgba(255,154,84,1) 10%, rgba(255,255,255,0) 90%)]' />
      </div>
    </div>
  )
}

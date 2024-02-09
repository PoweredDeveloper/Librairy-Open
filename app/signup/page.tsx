/**
 * ========== L I B R A I R Y ==========
 * Script written by Istomin Mikhail
 * PoweredDeveloper <https://github.com/PoweredDeveloper>
 */

'use client'
import Image from 'next/image'
import logo from '@/app/assets/images/logo/Logo.svg'
import Link from 'next/link'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { FormEvent, useRef, useState } from 'react'
import { useRouter } from 'next/navigation';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function AuthForm() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const username = useRef<HTMLInputElement>(null!)
  const verificationCode = useRef<HTMLInputElement>(null!)
  const [email, setEmail] = useState<string>(null!)
  const [isMessageSended, setMessageSended] = useState<boolean>(false)
  const [isLoading, setLoading] = useState<boolean>(false)

  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const signUpNewUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!/^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/.test(email)) {
      setEmailError('Введите корректный адресс эл. почты')
      return
    }
    if (username.current.value.length < 3) {
      setUsernameError('Имя пользователя должно содержать более 3 символов')
      return
    }
    if (username.current.value.length > 20) {
      setUsernameError('Имя пользователя должно содержать менее 20 символов')
      return
    }
    if (!/^[a-z0-9]+(?:[_-][a-z0-9]+)*$/.test(username.current.value)) {
      setUsernameError('Имя пользователя не должно содержать пробелы, состоять из латинских строчных букв, либо цифр. Может содержать знаки "_", "-"')
      return
    }
    setLoading(true)

    const { data: dataUsername, error: errorUsername } = await supabase.from('profiles').select(`username`).eq('username', username)
    if(dataUsername?.length != 0 || errorUsername) {
      setUsernameError("Это имя уже занято")
      setLoading(false)
      return
    }

    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        data: {
          full_name: username.current.value
        }
      }
    })

    if (error != null || data.user != null || data.session != null) {
      setLoading(false)
      return
    }

    setMessageSended(true)
    setLoading(false)
  }

  const verificateCode = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token: verificationCode.current.value.replace(/\s/g, ""),
      type: 'email',
    })
    setLoading(false)
    if (data) router.push('/user/account')
  }

  const signUpWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'https://librairy.vercel.app/auth/callback',
        queryParams: {
          access_type: 'offline',
          prompt: 'consent'
        }
      }
    })
  }

  return (
    <div className="flex flex-auto flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          className="mx-auto h-10 w-auto"
          src={logo}
          alt="Librairy Logo"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-brown-900">
          Регистрация аккаунта
        </h2>
      </div>
      {!isMessageSended ?
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={signUpNewUser} method="POST">
          <div>
              <label
                htmlFor="username"
                className="block text-sm leading-6 text-brown-900"
              >
                Имя пользователя
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="username"
                  disabled={isLoading}
                  ref={username}
                  autoComplete="username"
                  placeholder='Username'
                  required
                  className="autofill:bg-brown-50 disabled:bg-brown-100 transition-colors outline-none block w-full rounded-md border-0 p-2 text-brown-900 shadow-sm ring-1 ring-inset ring-brown-300 placeholder:text-brown-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                />
              </div>
              {usernameError && <span className='text-red-500 mt-1 w-full text-sm'>{usernameError}</span>}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm leading-6 text-brown-900"
              >
                E-mail
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  disabled={isLoading}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='example@mail.com'
                  autoComplete="email"
                  required
                  className="autofill:bg-brown-50 disabled:bg-brown-100 transition-colors outline-none block w-full rounded-md border-0 p-2 text-brown-900 shadow-sm ring-1 ring-inset ring-brown-300 placeholder:text-brown-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-sm sm:leading-6"
                />
              </div>
              {emailError && <span className='text-red-500 mt-1 w-full text-sm'>{emailError}</span>}
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="transition-colors disabled:bg-brown-800 flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
              >
                {isLoading ? <AiOutlineLoading3Quarters className='animate-spin' /> : 'Зарегистрироваться'}
              </button>
            </div>
            <div className="flex items-center justify-center my-6">
              <div className="border-b border-brown-400 w-1/2"></div>
              <p className="text-xs sm:text-sm md:text-base leading-none text-brown-400 px-3">
                ИЛИ
              </p>
              <div className="border-b border-brown-400 w-1/2"></div>
            </div>
            <div>
              <button
                type="button"
                onClick={signUpWithGoogle}
                disabled={isLoading}
                className="w-full border rounded-lg border-brown-800 py-1.5 px-2 md:py-2 md:px-3 flex items-center mt-4 md:mt-7"
              >
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0)">
                    <path
                      d="M21.9892 12.1871C21.9892 11.3677 21.9246 10.7697 21.7847 10.1497H12.6885V13.848H18.0277C17.9201 14.767 17.3388 16.1512 16.047 17.0812L16.0289 17.205L18.905 19.4969L19.1042 19.5173C20.9342 17.7789 21.9892 15.221 21.9892 12.1871Z"
                      fill="#4285F4"
                    ></path>
                    <path
                      d="M12.6886 21.9314C15.3044 21.9314 17.5004 21.0455 19.1044 19.5175L16.0472 17.0813C15.2291 17.6682 14.1311 18.0779 12.6886 18.0779C10.1266 18.0779 7.95214 16.3395 7.177 13.9366L7.06338 13.9466L4.0728 16.3273L4.03369 16.4391C5.62687 19.6946 8.89937 21.9314 12.6886 21.9314Z"
                      fill="#34A853"
                    ></path>
                    <path
                      d="M7.17667 13.9366C6.97215 13.3165 6.85378 12.6521 6.85378 11.9656C6.85378 11.279 6.97215 10.6147 7.16591 9.9946L7.1605 9.86254L4.13246 7.4436L4.03339 7.49208C3.37677 8.84299 3 10.36 3 11.9656C3 13.5712 3.37677 15.0881 4.03339 16.439L7.17667 13.9366Z"
                      fill="#FBBC05"
                    ></path>
                    <path
                      d="M12.6886 5.85336C14.5078 5.85336 15.7349 6.66168 16.4347 7.33718L19.1689 4.59107C17.4896 2.9855 15.3044 2 12.6886 2C8.89934 2 5.62686 4.23672 4.03369 7.49214L7.16622 9.99466C7.95211 7.59183 10.1266 5.85336 12.6886 5.85336Z"
                      fill="#EB4335"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0">
                      <rect
                        width="24"
                        height="24"
                        fill="white"
                        transform="translate(0.154297)"
                      ></rect>
                    </clipPath>
                  </defs>
                </svg>
                <p className="text-xs sm:text-sm md:text-base leading-none ml-4 text-brown-800">
                  Продолжить через Google
                </p>
              </button>
            </div>
          </form>

          <p className="mt-10 text-center flex justify-center items-center gap-1 text-sm text-brown-500">
            Уже читатель?
            <Link
              href="/signin"
              className="transition-colors font-medium underline leading-6 text-orange-500 hover:text-orange-600"
            >
              Войти
            </Link>
          </p>
        </div>
      :
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <h4 className='text-center text-brown-900 mb-5'>Введите код отправленный вам на почту</h4>
          <form className="space-y-6" onSubmit={e => verificateCode(e)} method="POST">
            <div>
              <input
                id="verificationCode"
                name="verificationCode"
                type="text"
                maxLength={6}
                placeholder='000000'
                ref={verificationCode}
                autoComplete="verificationCode"
                required
                className="autofill:bg-brown-50 text-center font-bold tracking-[3px] lg:tracking-[5px] text-3xl transition-colors outline-none block w-full rounded-md border-0 p-2 text-brown-900 shadow-sm ring-1 ring-inset ring-brown-300 placeholder:text-brown-400 focus:ring-2 focus:ring-inset focus:ring-orange-500 sm:text-xl sm:leading-6"
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="transition-colors disabled:bg-brown-800 flex w-full justify-center cursor-pointer rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
              >
                {isLoading? <AiOutlineLoading3Quarters className='animate-spin' /> : 'Подтвердить'}
              </button>
            </div>
          </form>
        </div>
      }
    </div>
  )
}

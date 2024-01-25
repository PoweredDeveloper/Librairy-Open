'use client'
import { FaRegCircleUser } from "react-icons/fa6";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Avatar({url}: {url: string | null}) {
  const supabase = createClientComponentClient()
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  
    useEffect(() => {
      async function downloadImage(path: string) {
        try {
          const { data, error } = await supabase.storage.from('avatars').download(path)
          if (error) {
            throw error
          }
  
          const url: string = URL.createObjectURL(data)
          setAvatarUrl(url)
        } catch (error) {
          console.log('Error downloading image: ', error)
        }
      }
  
      if (url) downloadImage(url)
    }, [url, supabase])

  return (
    <div className="col-span-full">
      <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
        Photo
      </label>
      <div className="mt-2 flex items-center gap-x-3">
        {avatarUrl
          ? <Image alt="User Icon" width={128} height={128} src={avatarUrl} className='max-h-12 max-w-12 rounded-full' />
          : <FaRegCircleUser className="h-12 w-12 text-gray-300" aria-hidden="true" />
        }
        <input
          type="file"
          id="single"
          accept="image/*"
          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 mr-2"
        />
      </div>
    </div>
  )
}

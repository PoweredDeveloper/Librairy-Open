'use client'
import React, { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import { FaRegCircleUser } from "react-icons/fa6";

export default function Avatar({
  uid,
  url,
  size,
  // onUpload,
}: {
  uid: string | undefined
  url: string | null
  size: number
  // onUpload: (url: string) => void
}) {
  const supabase = createClientComponentClient()
  const [avatarUrl, setAvatarUrl] = useState<string | null>(url)
  // const [uploading, setUploading] = useState(false)

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage.from('avatars').download(path)
        if (error) {
          throw error
        }

        const url = URL.createObjectURL(data)
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
          ? <Image alt="User Icon" style={{ height: size, width: size }} width={size} height={size} src={avatarUrl} className='max-h-12 max-w-12 rounded-full' />
          : <FaRegCircleUser className="h-12 w-12 text-gray-300" aria-hidden="true" />
        }
        <input
          type="file"
          id="single"
          // onChange={uploadAvatar}
          // disabled={uploading}
          accept="image/*"
          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 mr-2"
        />
        {/* {uploading ? 'Uploading ...' : 'Upload'} */}
      </div>
    </div>
  )
}
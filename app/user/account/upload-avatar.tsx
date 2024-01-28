'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import UserAvatar from './../../components/Presets/User/Avatar';
import { useRef, useState } from 'react';

const allowedFileExt: Array<string> = [
  'png',
  'jpg',
  'gif'
]

export default function UploadAvatar({
  uid,
  url,
  size,
  onUpload,
}: {
  uid: string | undefined
  url: string | null
  size: number
  onUpload: (url: string, file?: File) => void
}) {
  const supabase = createClientComponentClient()
  const [uploading, setUploading] = useState(false)

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.slice((file.name.lastIndexOf(".") - 1 >>> 0) + 2)
      const filePath = `${uid}-${Math.random()}.${fileExt}`

      if (!(fileExt in allowedFileExt)) throw new Error("File extension is not satisfied")
      const fileSize = file.size / 1024 / 1024
      if (fileSize > 2) throw new Error("file is too big")

      // const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

      // if (uploadError) {
      //   throw uploadError
      // }

      onUpload(filePath, file)
    } catch (error) {
      alert('Error uploading avatar! ' + error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="col-span-full">
      <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
        Photo
      </label>
      <div className="mt-2 flex items-center gap-x-3">
        <UserAvatar avatarUrl={url} size={size} className='rounded-full' />
        <label
          htmlFor="avatar-upload"
          className="rounded-md cursor-pointer bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 mr-2"
        >
          <span>{uploading ? 'Uploading...' : 'Change'}</span>
          <input onChange={uploadAvatar} disabled={uploading} id="avatar-upload" accept='image/*' name="avatar-upload" type="file" className="sr-only" />
        </label>
        <p className="text-sm leading-5 text-gray-600">PNG, JPG, GIF up to 3MB</p>
      </div>
    </div>
  )
}
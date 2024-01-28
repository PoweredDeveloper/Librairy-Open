'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import UserAvatar from './../../components/Presets/User/Avatar';
import { useState } from 'react';

export default function UploadAvatar({
  uid,
  url,
  size,
  onUpload,
}: {
  uid: string | undefined
  url: string | null
  size: number
  onUpload: (url: string) => void
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
      const fileExt = file.name.split('.').pop()
      const filePath = `${uid}-${Math.random()}.${fileExt}`

      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      onUpload(filePath)
    } catch (error) {
      alert('Error uploading avatar!')
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
      </div>
    </div>
  )
}
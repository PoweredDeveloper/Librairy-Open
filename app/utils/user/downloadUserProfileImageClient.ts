import { Database } from '@/types/supabase'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default async function downloadUserProfileImage(path: string) {
  const supabase = createClientComponentClient<Database>()
  if (path.includes('https://')) {
    try {
      const response = await fetch(path.replace('s96-c', 's512-c'))
      const blobImage = await response.blob()
      const url = URL.createObjectURL(blobImage)
      return url
    } catch (error) {
      console.log('Error downloading image [google]: ', error)
    }
  } else {
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .download(path)
      if (error) {
        throw error
      }

      const url = URL.createObjectURL(data)
      return url
    } catch (error) {
      console.log('Error downloading image: ', error)
    }
  }
}

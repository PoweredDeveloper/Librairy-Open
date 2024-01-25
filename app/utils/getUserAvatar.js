import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'

export default async function getAvatar(url) {
    const supabase = createClientComponentClient()
    const [avatarUrl, setAvatarUrl] = useState(null)
  
    useEffect(() => {
      async function downloadImage(path) {
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
    
    return avatarUrl
}
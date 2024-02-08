import Image from 'next/image';
import emptyUserImg from '@/app/assets/images/empty_user.jpg';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState, useEffect } from 'react';

export interface IUserAvatar {
    avatarUrl: string | null,
    size: number,
    className?: string | null,
    props?: React.Attributes
}

export default function UserAvatar({ avatarUrl, size, className, ...props }: IUserAvatar) {
    const supabase = createClientComponentClient()
    const [avatar, setAvatar] = useState<string | null>(avatarUrl)
    size = Math.min(Math.max(size, 16), 2048)

    useEffect(() => {
        async function downloadAvatar(path: string) {
            if (path.includes('googleusercontent.com')) {
                try {
                    const response = await fetch(path.replace('=s96-c', `=s${size}-c`))
                    const blobImage = await response.blob()
                    const url = URL.createObjectURL(blobImage)
                    setAvatar(url)
                } catch (error) {
                    console.error('Error while loading google avatar: ', error)
                }
             } else {
                try {
                    const {data, error} = await supabase.storage.from('avatars').download(path)
                    if (error) throw error
                    const url = URL.createObjectURL(data)
                    setAvatar(url)
                } catch (error) {
                    console.error('Error while downloading avatar: ', error)
                }
            }
        }

        if(avatarUrl) downloadAvatar(avatarUrl)
    }, [supabase, avatarUrl])

    return (
        <Image
            className={'select-none ' + className}
            alt='user-icon'
            src={avatar || emptyUserImg}
            style={{ height: size, width: size }}
            width={size}
            height={size}
            {...props}
        />
    )
}
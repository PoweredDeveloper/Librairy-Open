import Image from 'next/image';
import emptyUserImg from '@/app/assets/images/empty_user.jpg';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState, useEffect } from 'react';

interface IUserAvatar {
    avatarUrl: string | null,
    size: number,
    className?: string | null
}

export default function UserAvatar({ avatarUrl, size, className }: IUserAvatar) {
    const supabase = createClientComponentClient()
    const [avatar, setAvatar] = useState<string | null>(avatarUrl)

    useEffect(() => {
        async function downloadAvatar(path: string) {
            try {
                const {data, error} = await supabase.storage.from('avatars').download(path)
                if (error) throw error
                const url = URL.createObjectURL(data)
                setAvatar(url)
            } catch (error) {
                console.error('Error while downloading avatar: ', error)
            }
        }

        if(avatarUrl) downloadAvatar(avatarUrl)
    }, [supabase, avatarUrl])

    return (
        <>
            <Image
                className={className || ''}
                alt='user-icon'
                src={avatar || emptyUserImg}
                style={{ height: size, width: size }}
                width={size}
                height={size}
            />
        </>
    )
}
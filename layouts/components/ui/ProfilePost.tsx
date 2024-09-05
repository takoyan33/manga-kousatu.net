import React from 'react'
import Image from 'react-image-resizer'

interface ProfilePostParams {
  id: number
  profileImage: string
  username: string
  bio: string
  favorite: string[]
}

// eslint-disable-next-line react/display-name
export const ProfilePost = React.memo(
  ({ id, profileImage, username, bio, favorite }: ProfilePostParams) => {
    return (
      <div key={id}>
        <div className='m-auto max-w-sm text-center'>
          <Image height={100} width={100} src={profileImage} alt='プロフィール画像' />
        </div>
        <p className='m-5' aria-label='name-text'>
          名前：{username}
        </p>
        <p className='m-5' aria-label='profile-text'>
          プロフィール：{bio}
        </p>
        <p className='m-5' aria-label='liked-text'>
          好きな漫画：{favorite.join(', ')}
        </p>
      </div>
    )
  },
)

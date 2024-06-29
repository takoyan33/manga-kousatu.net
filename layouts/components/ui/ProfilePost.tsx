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
export const ProfilePost = React.memo(({ id, profileImage, username, bio, favorite }: ProfilePostParams) => {
  return (
    <div key={id}>
      <p className='m-auto max-w-sm text-center'>
        <Image height={100} width={100} src={profileImage} />
      </p>
      <p className='m-5'>名前：{username}</p>
      <p className='m-5'>プロフィール：{bio}</p>
      <p className='m-5'>好きな漫画：{favorite.join(', ')}</p>
    </div>
  )
})

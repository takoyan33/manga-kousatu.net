import React from 'react'
import Avatar from '@mui/material/Avatar'
import FavoriteIcon from '@mui/icons-material/Favorite'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import BorderColorIcon from '@mui/icons-material/BorderColor'

type Props = {
  profileimage: string
  id: number
  username: string
  bio: string
  favorite: string[]
}

// eslint-disable-next-line react/display-name
export const ProfileId: React.VFC<Props> = React.memo(
  ({ id, profileimage, username, bio, favorite }) => {
    return (
      <div className=''>
        <h2 className='m-5 my-12 text-center text-2xl font-semibold'>
          {username} さんのプロフィール
        </h2>
        <div className='m-auto flex max-w-md'>
          <div key={id}>
            <p>
              <Avatar
                className='m-auto max-w-sm border text-center'
                alt='プロフィール'
                sx={{ width: 150, height: 150 }}
                src={profileimage}
              />
            </p>
          </div>
          <div className=''>
            <p className='m-5 text-lg'>
              <AccountBoxIcon /> {username}
            </p>
            <h2 className='m-5'>
              <FavoriteIcon /> 好きな漫画
            </h2>
            <div className='m-5'>
              {favorite &&
                favorite.map((favorite, index) => (
                  <p className='my-2 text-cyan-700' key={index}>
                    ＃{favorite}　
                  </p>
                ))}
            </div>
          </div>
        </div>
        <div className='m-auto my-10 max-w-md'>
          <h2 className='m-5'>
            <BorderColorIcon className='mr-2' /> プロフィール
          </h2>
          <p className='m-5'>{bio}</p>
        </div>
      </div>
    )
  },
)

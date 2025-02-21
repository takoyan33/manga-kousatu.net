import AccountBoxIcon from '@mui/icons-material/AccountBox'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Avatar from '@mui/material/Avatar'
import React from 'react'
import { ProfileParams } from 'types/user'

// eslint-disable-next-line react/display-name
export const ProfileId = React.memo(
  ({ id, profileImage, userName, bio, favorite }: ProfileParams) => {
    return (
      <>
        <div className='m-auto flex max-w-md'>
          <div key={id}>
            <Avatar
              className='m-auto max-w-sm border text-center'
              alt='プロフィール画像'
              sx={{ width: 150, height: 150 }}
              src={profileImage}
            />
          </div>
          <div>
            <p className='m-5 text-lg' aria-label='name-text'>
              <AccountBoxIcon /> {userName}
            </p>
            <p className='m-5'>
              <FavoriteIcon /> 好きな漫画
            </p>
            <div className='m-5' aria-label='liked-text'>
              {favorite &&
                favorite.map((favorite, index) => (
                  <p className='my-2 text-cyan-700' key={index}>
                    #{favorite}
                  </p>
                ))}
              {favorite && favorite.length === 0 && <p>好きな漫画はありません</p>}
            </div>
          </div>
        </div>
        <div className='m-auto my-10 max-w-md'>
          <p className='m-5'>
            <BorderColorIcon className='mr-2' /> プロフィール
          </p>
          <p className='m-5' aria-label='profile-text'>
            {bio ? bio : 'プロフィールはまだありません'}
          </p>
        </div>
      </>
    )
  },
)

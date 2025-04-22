import FavoriteIcon from '@mui/icons-material/Favorite'
import { Avatar } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { useGetOtherUser } from '../../../layouts/hooks'
import { Category } from '../text/Category'
import { SiteSpoil } from '../text/SiteSpoil'
import { CardPostParams } from 'types/post'
import { GetUser } from 'types/user'
import { formatTimeAgo } from 'utils/date-helper'

export const CardPost = React.memo(
  ({ downloadURL, id, likes, title, category, netabare, createdAt, userid }: CardPostParams) => {
    const [users, setUsers] = useState<GetUser | null>(null)

    // / 親コンポーネントが再レンダリングしない
    const fetchUser = useCallback(() => {
      useGetOtherUser(setUsers, userid)
    }, [userid])

    useEffect(() => {
      fetchUser()
    }, [fetchUser])

    const formattedDate = useMemo(() => formatTimeAgo(createdAt), [createdAt])

    return (
      <article className='m-auto my-2 mx-4 hover:opacity-80'>
        <dl>
          <Link href={`/post/${id}`} className='cursor-pointer'>
            <div className='cardPost-img'>
              <Image
                className='cardPost-img rounded'
                src={downloadURL || '/images/no-image.jpg'}
                alt={`${title}の画像`}
                height={144}
                width={232}
                priority
                sizes='(max-width: 768px) 100vw, 232px'
                quality={20}
              />
            </div>
          </Link>
          <div>
            <h3 className='my-1 text-left text-lg font-semibold'>{title}</h3>
            <div className='flex'>
              <Category category={category} />
              <SiteSpoil spoil={netabare} />
            </div>
            <div>
              <div className='m-auto flex items-center py-2'>
                <Avatar
                  className='border'
                  sx={{ width: 30, height: 30 }}
                  alt='投稿者プロフィール画像'
                  src={users?.profileImage || '/images/no-image.jpg'}
                />
                <dl className='ml-1 text-sm'>
                  {users?.userName || 'ユーザー名未設定'}
                  <span className='ml-2 text-pink-400'>
                    <FavoriteIcon />
                  </span>
                  <span className='ml-1 text-sm'>{likes}</span>
                </dl>
                <span className='ml-2 text-sm text-gray-600'>{formattedDate}</span>
              </div>
            </div>
          </div>
        </dl>
      </article>
    )
  },
)

CardPost.displayName = 'CardPost'

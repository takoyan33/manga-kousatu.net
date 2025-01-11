import FavoriteIcon from '@mui/icons-material/Favorite'
import { Avatar } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useEffect, useState, useMemo, useCallback } from 'react'
import { Category } from '../../layouts/components/text/Category'
import { useGetOtherUser } from '../../layouts/hooks'
import { FixDaysAgo } from 'layouts/utils/Date_helper'
import { SingleGetPostParams } from 'types/post'
import { GetUser } from 'types/user'

// eslint-disable-next-line react/display-name
export const CardPost = React.memo(
  ({
    downloadURL,
    id,
    likes,
    title,
    category,
    netabare,
    createTime,
    userid,
  }: SingleGetPostParams) => {
    const [users, setUsers] = useState<GetUser>()

    useEffect(() => {
      useGetOtherUser(setUsers, userid)
    }, [])

    return (
      <div className='m-auto my-2 hover:opacity-80'>
        <dl>
          <Link href={`/post/${id}`}>
            <div className='cardPost-img'>
              <Image
                className='cardPost-img rounded text-center'
                src={downloadURL}
                alt='画像'
                layout='fill'
              />
            </div>
          </Link>
          <div>
            <h3 className='my-1 text-left text-lg font-semibold'>{title}</h3>
            <div className='flex'>
              <Category category={category} />
              {netabare === 'spoil' && (
                <dl className='mx-1 mt-1 inline-block rounded border border-red-500 py-1 px-2 text-center text-sm'>
                  {netabare}
                </dl>
              )}
            </div>
            <div>
              <div className='m-auto flex py-2'>
                <dl>
                  <Avatar
                    className='max-w-sm border text-center'
                    sx={{ width: 30, height: 30 }}
                    alt='投稿者プロフィール'
                    src={users?.profileImage}
                  />
                </dl>
                <dl className='ml-1 mt-1'>
                  {users?.userName}
                  <span className='ml-2 text-pink-400'>
                    <FavoriteIcon />
                  </span>
                  <span className='ml-1'>{likes}</span>
                </dl>
                <dl className='ml-2 mt-1 text-gray-600'>{FixDaysAgo(createTime)}</dl>
              </div>
            </div>
          </div>
        </dl>
      </div>
    )
  },
)

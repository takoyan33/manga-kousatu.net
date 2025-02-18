'use client'

import FavoriteIcon from '@mui/icons-material/Favorite'
import { Avatar } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useGetOtherUser } from '../../../layouts/hooks'
import { Category } from '../text/Category'
import { SiteSpoil } from 'layouts/components/text'
import { CardPostParams } from 'types/post'
import { GetUser } from 'types/user'
import { FixDaysAgo } from 'utils/date-helper'

// eslint-disable-next-line react/display-name
export const RecommendCardPost = React.memo(
  ({ downloadURL, id, likes, title, category, netabare, createTime, userid }: CardPostParams) => {
    const [users, setUsers] = useState<GetUser>()
    // const [comments, setComments] = useState('')

    useEffect(() => {
      useGetOtherUser(setUsers, userid)
      // useGetPostComment()
    }, [])

    return (
      <dl className='m-auto my-2 flex hover:opacity-80'>
        <Link href={`/post/${id}`}>
          <Image
            className='w-20 rounded text-center'
            height={30}
            width={130}
            src={downloadURL}
            alt='画像'
          />
        </Link>
        <div className='ml-4'>
          <div className='flex'>
            <h3 className='my-1 mr-3 text-left text-lg font-semibold'>{title}</h3>
            <Category category={category} />
            <SiteSpoil spoil={netabare} />
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
    )
  },
)

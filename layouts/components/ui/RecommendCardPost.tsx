import FavoriteIcon from '@mui/icons-material/Favorite'
import { Avatar } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { useEffect, useState, useMemo, useCallback } from 'react'
import Image from 'react-image-resizer'
import { useGetOtherUser } from '../../../layouts/components/hooks'
import { Category } from '../text/Category'
import { SingleGetPostParams } from 'types/post'
import { GetUser } from 'types/user'

// eslint-disable-next-line react/display-name
export const RecommendCardPost = React.memo(
  ({
    downloadURL,
    id,
    likes,
    title,
    category,
    netabare,
    displayName,
    email,
    photoURL,
    createTime,
    selected,
    userid,
  }: SingleGetPostParams) => {
    const [users, setUsers] = useState<GetUser>()
    const [comments, setComments] = useState('')

    useEffect(() => {
      useGetOtherUser(setUsers, userid)
      // useGetPostComment()
    }, [])

    function daysAgo(createTime) {
      const inputDate: any = new Date(createTime)
      const currentDate: any = new Date()

      // 時間の差をミリ秒単位で計算
      const diffTime = currentDate - inputDate

      // ミリ秒から時間、分に変換
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
      const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60))
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

      if (diffDays > 0) {
        return `${diffDays}日前`
      } else if (diffHours > 0) {
        return `${diffHours}時間前`
      } else {
        return `${diffMinutes}分前`
      }
    }
    return (
      <Link href={`/post/${id}`}>
        <dl className='m-auto my-2 flex hover:opacity-80'>
          <Image
            className='rounded text-center'
            height={80}
            width={130}
            src={downloadURL}
            alt='画像'
          />
          <div className='ml-4'>
            <div className='flex '>
              <h3 className='my-1 mr-3 text-left text-lg font-semibold'>{title}</h3>
              <Category category={category} />
              {netabare === 'ネタバレ有' ? (
                <div>
                  <dl className='mx-1 mt-1 inline-block rounded border border-red-500 py-1 px-2 text-center text-sm'>
                    {netabare}
                  </dl>
                </div>
              ) : (
                <dl></dl>
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
                  <span className=' ml-2 text-pink-400'>
                    <FavoriteIcon />
                  </span>
                  <span className='ml-1'>{likes}</span>
                </dl>
                <dl className='ml-2 mt-1 text-gray-600'>{daysAgo(createTime)}</dl>
              </div>
            </div>
          </div>
        </dl>
      </Link>
    )
  },
)

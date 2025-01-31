import FavoriteIcon from '@mui/icons-material/Favorite'
import { Avatar } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { useGetOtherUser } from '../../../layouts/hooks'
import { Category } from '../text/Category'
import { SiteSpoil } from 'layouts/components/text'
import { FixDaysAgo } from 'layouts/utils/Date_helper'
import { CardPostParams } from 'types/post'
import { GetUser } from 'types/user'

// eslint-disable-next-line react/display-name
export const CardPost = React.memo(
  ({ downloadURL, id, likes, title, category, netabare, createTime, userid }: CardPostParams) => {
    const [users, setUsers] = useState<GetUser>()
    // const [comments, setComments] = useState('')

    // const useGetPostComment = async () => {
    //   const commentseRef = collection(database, 'comments')
    //   const c = query(commentseRef, where('postid', '==', id))
    //   try {
    //     const querySnapshot = await getDocs(c)
    //     const allcomments = querySnapshot.docs.map((doc) => ({
    //       ...doc.data(),
    //       id: doc.id,
    //     }))
    //     console.log('allcomments', allcomments)
    //     setComments(allcomments)
    //   } catch (error) {
    //     console.log('Error fetching user data', error)
    //   }
    // }

    useEffect(() => {
      useGetOtherUser(setUsers, userid)
      // useGetPostComment()
    }, [])

    return (
      <article className='m-auto my-2 mx-4 hover:opacity-80'>
        <dl>
          <Link href={`/post/${id}`} className='cursor-pointer'>
            <div className='cardPost-img'>
              <Image
                className='cardPost-img rounded text-center'
                src={downloadURL}
                alt={`${title}の画像`}
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                priority
              />
            </div>
          </Link>
          <div>
            <h3 className='my-1 text-left text-lg font-semibold'>{title}</h3>
            <div className='flex'>
              <Category category={category} />
              <SiteSpoil netabare={netabare} />
            </div>
            <div>
              <div className='m-auto flex py-2'>
                <dl>
                  <Avatar
                    className='max-w-sm border text-center'
                    sx={{ width: 30, height: 30 }}
                    alt='投稿者プロフィール画像'
                    src={users?.profileImage}
                  />
                </dl>
                <dl className='ml-1 mt-1 text-sm'>
                  {users?.userName || 'ユーザー名未設定'}
                  <span className='ml-2 text-pink-400'>
                    <FavoriteIcon />
                  </span>
                  <span className='ml-1 text-sm'>{likes}</span>
                </dl>
                <span className='ml-2 mt-1 text-sm text-gray-600'>{FixDaysAgo(createTime)}</span>
              </div>
            </div>
          </div>
        </dl>
      </article>
    )
  },
)

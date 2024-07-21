import React from 'react'
import Link from 'next/link'
import { useEffect, useState, useMemo, useCallback } from 'react'
import { database } from 'firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useGetPost, useGetUsers, useGetOtherUser } from 'layouts/components/hooks'
import { getAuth } from 'firebase/auth'
import styles from 'styles/Home.module.css'
import { Card, CardContent, Typography, Avatar } from '@mui/material'
import Image from 'react-image-resizer'
import Category from '../text/Category'
import FavoriteIcon from '@mui/icons-material/Favorite'
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
    displayName,
    email,
    photoURL,
    createTime,
    selected,
    userid,
  }: SingleGetPostParams) => {
    const [users, setUsers] = useState<GetUser>()
    const [comments, setComments] = useState('')
    const cardStyle: React.CSSProperties = {
      margin: '10px',
    }

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

    function daysAgo(createTime) {
      const inputDate = new Date(createTime)
      const currentDate = new Date()

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
      <div className='w-full cursor-pointer md:w-1/3'>
        <Link href={`/post/${id}`}>
          <div key={id} className='m-auto w-4/5'>
            <div className='m-auto my-2 hover:opacity-80' style={cardStyle}>
              <dl>
                <div className='m-auto flex justify-center'>
                  <Image
                    className='rounded text-center'
                    height={150}
                    width={200}
                    src={downloadURL}
                    alt='画像'
                  />
                </div>
                <CardContent>
                  <h3 className='text-left text-xl font-semibold'>{title}</h3>
                  <div className='flex'>
                    <Category category={category} />
                    {netabare === 'ネタバレ有' ? (
                      <div>
                        <dl className='mx-1 mt-1 inline-block rounded border border-red-500 py-1 px-2 text-center text-sm'>
                          {netabare}
                        </dl>
                      </div>
                    ) : (
                      <dl className='mx-1 mt-1 inline-block rounded border border-gray-700 p-1 text-center text-sm text-gray-500'>
                        {netabare}
                      </dl>
                    )}
                  </div>
                  <div className='m-auto w-80' style={styles}></div>
                  {/* <div className='mt-3 max-w-xs'>
                    {selected &&
                      selected.map((tag, i) => (
                        // <Link href={`/post/tag/${tag}`} key={i}>
                        <span
                          className='rounded-xl border border-cyan-700 py-1 px-2 text-center text-cyan-700'
                          key={i}
                        >
                          #{tag}
                        </span>
                        // </Link>
                      ))}
                  </div> */}
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
                      <dl className='ml-2'>
                        {users?.userName}
                        <span className=' text-pink-400'>
                          <FavoriteIcon />
                        </span>
                        <span className='ml-1'>{likes}</span>
                      </dl>
                      <dl className='ml-2'>{daysAgo(createTime)}</dl>
                    </div>
                  </div>
                </CardContent>
              </dl>
            </div>
          </div>
        </Link>
      </div>
    )
  },
)

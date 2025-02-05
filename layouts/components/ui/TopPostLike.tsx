'use client'

import FavoriteIcon from '@mui/icons-material/Favorite'
import { getAuth } from 'firebase/auth'
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { database } from 'firebaseConfig'
import { FavoriteIconAnim } from 'layouts/components/ui/FavoriteIconAnim'
import { useGetPost } from 'layouts/hooks'
import { GetPost } from 'types/post'

// eslint-disable-next-line react/display-name
export const TopPostLike = React.memo(() => {
  const auth = getAuth()
  const user = auth.currentUser
  const router = useRouter()
  const routerid: any = router.query.id

  const [singlePost, setSinglePost] = useState<GetPost>()
  const [likecount, setLikecount] = useState<number>(0)

  useEffect(() => {
    useGetPost(setSinglePost, routerid)
  }, [routerid])

  const [on, setOn] = useState<boolean>(false)

  //いいねの追加
  const LikeAdd = (routerId, likes: number, email: string) => {
    const post = doc(database, 'posts', routerId)
    updateDoc(post, {
      likes: likes + 1,
      likesEmail: arrayUnion(email),
    })
      .then(() => {
        setOn((prev) => !prev)
        setLikecount(0)
        setTimeout(() => {
          useGetPost(setSinglePost, routerId)
        }, 2000)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  //いいねの削除
  const LikeDelete = (routerId, likes: number, email: string) => {
    const post = doc(database, 'posts', routerId)
    updateDoc(post, {
      likes: likes - 1,
      likesEmail: arrayRemove(email),
    })
      .then(() => {
        setLikecount(0)
        useGetPost(setSinglePost, routerId)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      <div className='my-4'>
        <span className='text-pink-400'>
          <FavoriteIcon />
        </span>
        {singlePost?.likes}
      </div>

      {singlePost?.likesEmail && user?.email == singlePost?.email && (
        <p className='mb-4'>自分の投稿なのでいいねできません</p>
      )}

      {user?.email != singlePost?.email && singlePost?.likesEmail?.includes(user?.email || '') && (
        <div>
          <p>いいね済み</p>
          <button
            className='my-2 inline'
            onClick={() => LikeDelete(routerid, singlePost.likes, user?.email || '')}
            id='delete-favorite'
          >
            <span className='py-4 text-pink-400 hover:text-pink-700'>
              <FavoriteIcon />
              いいね解除
            </span>
          </button>
        </div>
      )}
      {user?.email != singlePost?.email && !singlePost?.likesEmail?.includes(user?.email || '') && (
        <button
          onClick={() => LikeAdd(routerid, singlePost?.likes || 0, user?.email || '')}
          id='add-favorite'
        >
          <FavoriteIconAnim on={on} />
          <span>いいねする</span>
        </button>
      )}
    </div>
  )
})

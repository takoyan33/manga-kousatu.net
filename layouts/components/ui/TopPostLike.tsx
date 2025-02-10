import FavoriteIcon from '@mui/icons-material/Favorite'
import { getAuth } from 'firebase/auth'
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
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
  const [on, setOn] = useState<boolean>(false) // アニメーションの状態を管理

  useEffect(() => {
    if (routerid) {
      // 投稿データを取得
      useGetPost(setSinglePost, routerid)
    }
  }, [routerid])

  // いいねの追加
  const addLike = async (routerId: string, likes: number, email: string) => {
    const postRef = doc(database, 'posts', routerId)
    try {
      await updateDoc(postRef, {
        likes: likes + 1,
        likesEmail: arrayUnion(email),
      })
      setOn(true) // アニメーション開始

      setTimeout(() => {
        setOn(false)
        useGetPost(setSinglePost, routerid)
      }, 2500)
    } catch (err) {
      console.error(err)
    }
  }

  // いいねの削除
  const removeLike = async (routerId: string, likes: number, email: string) => {
    const postRef = doc(database, 'posts', routerId)
    try {
      await updateDoc(postRef, {
        likes: likes - 1,
        likesEmail: arrayRemove(email),
      })
      setTimeout(() => {
        useGetPost(setSinglePost, routerid)
      }, 1000)
    } catch (err) {
      console.error(err)
    }
  }

  const isLikedByUser = singlePost?.likesEmail?.includes(user?.email || '') || false
  const isPostOwner = user?.email === singlePost?.email

  return (
    <div>
      <div className='my-4'>
        <span className='text-pink-400'>
          <FavoriteIcon />
        </span>
        {singlePost?.likes}
      </div>

      {isPostOwner && <p className='mb-4'>自分の投稿なのでいいねできません</p>}

      {user && !isPostOwner && (
        <>
          {isLikedByUser ? (
            <div>
              <p>いいね済み</p>
              <button
                className='my-2 inline'
                onClick={() => removeLike(routerid, singlePost?.likes || 0, user?.email || '')}
                id='delete-favorite'
              >
                <span className='py-4 text-pink-400 hover:text-pink-700'>
                  <FavoriteIcon />
                  いいね解除
                </span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => addLike(routerid, singlePost?.likes || 0, user?.email || '')}
              id='add-favorite'
            >
              <FavoriteIconAnim on={on} />
              <span>いいねする</span>
            </button>
          )}
        </>
      )}
    </div>
  )
})

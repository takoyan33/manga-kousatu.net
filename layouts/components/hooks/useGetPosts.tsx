import { onSnapshot, query, orderBy, where, doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { database } from '../../../firebaseConfig'
import { postsRef } from '../../../layouts/utils/post'
import { GetPost } from 'types/post'

//新しいpostを取得
export const useFetchPosts = async (setPostData: any) => {
  onSnapshot(postsRef, (querySnapshot) => {
    setPostData(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  })
}

//新しいpostを取得
// export const useFetchPosts = async () => {
//   const [value, setValue] = useState([])

//   useEffect(() => {
//     const fetchData = async () => {
//       await onSnapshot(postsRef, (querySnapshot) => {
//         setValue(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
//       })
//     }

//     fetchData()
//   }, [])

//   return [value, setValue]
// }

//古いpostを取得
export const useGetOldPosts = async (setPostData: any) => {
  const oldPost = query(postsRef, orderBy('timestamp', 'desc'))

  onSnapshot(oldPost, (querySnapshot) => {
    setPostData(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  })
}
//いいね順でpostを取得
export const useGetLikePosts = async (setPostData: any) => {
  const likePost = query(postsRef, orderBy('likes', 'desc'))

  onSnapshot(likePost, (querySnapshot) => {
    setPostData(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  })
}

//ネタバレ有りでpostを取得
export const useGetNetabrePosts = async (setPostData: any) => {
  const netabarePost = query(postsRef, where('netabare', '==', 'ネタバレ有'))

  onSnapshot(netabarePost, (querySnapshot) => {
    setPostData(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  })
}

//ネタバレなしでpostを取得
export const useGetNoNetabrePosts = async (setPostData: any) => {
  const noNetabarePost = query(postsRef, where('netabare', '==', 'ネタバレ無'))

  onSnapshot(noNetabarePost, (querySnapshot) => {
    setPostData(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  })
}

//ユーザーの投稿データを取得
export const useGetMyPosts = async (setPostData: any, myEmail: string) => {
  const myPosts = query(postsRef, where('email', '==', myEmail))

  onSnapshot(myPosts, (querySnapshot) => {
    setPostData(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  })
}

//自分がいいねした投稿データを取得
export const useGetLikedPosts = async (setLikedPosts, myEmail: string) => {
  const myLikedPosts = query(postsRef, where('likes_email', 'array-contains', myEmail))

  onSnapshot(myLikedPosts, (querySnapshot) => {
    setLikedPosts(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  })
}

//特定のpostを取得
export const useGetPost = async (setSinglePost, routerId) => {
  try {
    const ref = await doc(database, 'posts', routerId)
    const snap = await getDoc(ref)
    setSinglePost(snap.data())
  } catch (error) {
    console.log(error)
  }
}
//特定ユーザーのpostsを取得
export const useGetUsersPosts = async (setPostData, userId: string) => {
  const userPosts = query(postsRef, where('userid', '==', userId))

  onSnapshot(userPosts, (querySnapshot) => {
    setPostData(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  })
}

//同じカテゴリの投稿を取得

// export const categoriPost = async (setSinglePost) => {
//   //firestoreからデータ取得
//   await getDocs(q).then((querySnapshot) => {
//     //コレクションのドキュメントを取得
//     setSinglePost(
//       querySnapshot.docs.map((data) => {
//         //配列なので、mapで展開する
//         return { ...data.data(), id: data.id }
//         //スプレッド構文で展開して、新しい配列を作成
//       }),
//     )
//   })
// }

//カテゴリの新しい投稿を取得（自分の記事以外）
export const useGetCategoryPosts = async (setPostData, postCategory: string, routerid) => {
  const categoryPosts = query(
    postsRef,
    where('category', '==', postCategory),
    where('id', '!=', routerid),
  )

  onSnapshot(categoryPosts, (querySnapshot) => {
    setPostData(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  })
}

//特定カテゴリの古い投稿を取得
export const useGetCategoriOldPosts = async (setPostData, postCategory: string) => {
  const categoryPosts = query(postsRef, where('category', '==', postCategory), orderBy('timestamp'))

  onSnapshot(categoryPosts, (querySnapshot) => {
    setPostData(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  })
}

//特定カテゴリのいいね順の投稿を取得
export const useGetCategoriLikePosts = async (setPostData, postCategory: string) => {
  const categoryPosts = query(
    postsRef,
    where('category', '==', postCategory),
    orderBy('likes', 'desc'),
  )

  onSnapshot(categoryPosts, (querySnapshot) => {
    setPostData(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  })
}

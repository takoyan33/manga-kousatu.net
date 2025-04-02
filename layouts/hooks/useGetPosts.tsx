import { onSnapshot, query, orderBy, where, doc, getDoc, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { database } from '../../firebaseConfig'
import { postsRef } from '../../utils/post'
import { GetPost } from 'types/post'
// import { GetPost } from 'types/post'

/**
 * 新しいpostを取得
 * @returns postData
 */
export const useFetchPost = (): Array<GetPost> | [] => {
  const [postData, setPostData] = useState<Array<GetPost> | []>([])

  useEffect(() => {
    const unsubscribe = onSnapshot(postsRef, (querySnapshot) => {
      const posts = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as GetPost))
      setPostData(posts)
    })

    return () => unsubscribe()
  }, [])

  return postData
}

/**
 * 古いpostを取得
 * @returns oldPostData
 */
export const useGetOldPosts = async (setPostData: any): Promise<void> => {
  const oldPost = query(postsRef, orderBy('timestamp', 'asc'))

  onSnapshot(oldPost, (querySnapshot) => {
    setPostData(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  })
}

/**
 * 新しいpostを取得
 * @returns oldPostData
 */
export const useGetNewPosts = async (setPostData: any): Promise<void> => {
  const oldPost = query(postsRef, orderBy('timestamp', 'desc'))

  onSnapshot(oldPost, (querySnapshot) => {
    setPostData(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  })
}

/**
 * いいね順でpostを取得
 * @returns postData
 */
export const useGetLikePosts = async (setPostData: any): Promise<void> => {
  const likePost = query(postsRef, orderBy('likes', 'desc'))

  onSnapshot(likePost, (querySnapshot) => {
    setPostData(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  })
}

/**
 * ネタバレ有りでpostを取得
 * @returns postData
 */
export const useGetNetabrePosts = async (setPostData: any): Promise<void> => {
  const netabarePost = query(postsRef, where('netabare', '==', 'spoil'))

  onSnapshot(netabarePost, (querySnapshot) => {
    setPostData(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  })
}

/**
 * ネタバレなしでpostを取得
 * @returns postData
 */
export const useGetNoNetabrePosts = async (setPostData: any): Promise<void> => {
  const noNetabarePost = query(postsRef, where('netabare', '==', 'notSpoil'))

  onSnapshot(noNetabarePost, (querySnapshot) => {
    setPostData(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  })
}

/**
 * ユーザーの投稿データを取得
 * @returns postData
 */
export const useGetMyPosts = async (setPostData: any, myEmail: string): Promise<void> => {
  const myPosts = query(postsRef, where('email', '==', myEmail))

  onSnapshot(myPosts, (querySnapshot) => {
    setPostData(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  })
}

/**
 * 自分がいいねした投稿データを取得
 * @returns postData
 */
export const useGetLikedPosts = async (setLikedPosts, myEmail: string): Promise<void> => {
  const myLikedPosts = query(postsRef, where('likes_email', 'array-contains', myEmail))

  onSnapshot(myLikedPosts, (querySnapshot) => {
    setLikedPosts(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  })
}

/**
 * 特定のpostを取得
 * @returns postData
 */
export const useGetPost = async (routerId: string): Promise<GetPost | undefined> => {
  try {
    const ref = doc(database, 'posts', routerId)
    const snap = await getDoc(ref)

    const postData = snap.data()
    console.log(postData)

    if (!postData || typeof postData !== 'object') {
      console.error('取得したデータの形式が不正です', postData)
      return undefined
    }

    return postData as GetPost
  } catch (error) {
    console.error('Error fetching post:', error)
    return undefined
  }
}

/**
 * 特定ユーザーのpostsを取得
 * @returns postData
 */
export const useGetUsersPosts = async (setPostData, userId: string): Promise<void> => {
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

/**
 * カテゴリの新しい投稿を取得（自分の記事以外）
 * @returns postData
 */
export const useGetCategoryPosts = async (
  setPostData,
  postCategory: string,
  routerid: string,
): Promise<void> => {
  const categoryPosts = query(
    postsRef,
    where('category', '==', postCategory),
    where('id', '!=', routerid),
  )

  onSnapshot(categoryPosts, (querySnapshot) => {
    setPostData(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  })
}

/**
 * 特定カテゴリの古い投稿を取得
 * @returns postData
 */
export const useGetCategoryOldPosts = async (setPostData, postCategory: string): Promise<void> => {
  const categoryPosts = query(postsRef, where('category', '==', postCategory), orderBy('timestamp'))

  onSnapshot(categoryPosts, (querySnapshot) => {
    setPostData(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  })
}

/**
 * 特定カテゴリのいいね順の投稿を取得
 * @returns postData
 */
export const useGetCategoryLikePosts = async (setPostData, postCategory: string): Promise<void> => {
  const categoryPosts = query(
    postsRef,
    where('category', '==', postCategory),
    orderBy('likes', 'desc'),
  )

  onSnapshot(categoryPosts, (querySnapshot) => {
    setPostData(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  })
}

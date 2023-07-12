import {
  onSnapshot,
  collection,
  query,
  orderBy,
  where,
  doc,
  getDoc,
  getDocs,
} from 'firebase/firestore'
import { database } from 'firebaseConfig'

//新しいpostを取得
export const getPosts = async (setPostData) => {
  const databaseRef = collection(database, 'posts')
  const descPost = query(databaseRef, orderBy('timestamp', 'desc'))

  onSnapshot(descPost, (querySnapshot) => {
    setPostData(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    console.log('成功')
  })
}

//古いpostを取得
export const getOldPosts = async (setPostData) => {
  const databaseRef = collection(database, 'posts')
  const oldPost = query(databaseRef, orderBy('timestamp'))

  onSnapshot(oldPost, (querySnapshot) => {
    setPostData(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  })
}

//いいね順でpostを取得
export const getLikePosts = async (setPostData) => {
  const databaseRef = collection(database, 'posts')
  const likePost = query(databaseRef, orderBy('likes', 'desc'))

  onSnapshot(likePost, (querySnapshot) => {
    setPostData(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  })
}

//ネタバレ有りでpostを取得
export const getNetabrePosts = async (setPostData) => {
  const databaseRef = collection(database, 'posts')
  const netabarePost = query(databaseRef, where('netabare', '==', 'ネタバレ有'))

  onSnapshot(netabarePost, (querySnapshot) => {
    setPostData(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  })
}

//ネタバレなしでpostを取得
export const getNoNetabrePosts = async (setPostData) => {
  const databaseRef = collection(database, 'posts')
  const noNetabarePost = query(databaseRef, where('netabare', '==', 'ネタバレ無'))

  onSnapshot(noNetabarePost, (querySnapshot) => {
    setPostData(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  })
}

//ユーザーの投稿データを取得
export const getMyPosts = async (setPostData, myEmail) => {
  const databaseRef = collection(database, 'posts')
  const myPosts = query(databaseRef, where('email', '==', myEmail))

  onSnapshot(myPosts, (querySnapshot) => {
    setPostData(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  })
}

//自分がいいねした投稿データを取得
export const getLikedPosts = async (setLikedPosts, myEmail) => {
  const databaseRef = collection(database, 'posts')
  const myLikedPosts = query(databaseRef, where('likes_email', 'array-contains', myEmail))

  onSnapshot(myLikedPosts, (querySnapshot) => {
    setLikedPosts(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  })
}

//特定のpostを取得
export const getPost = async (setSinglePost, routerId) => {
  try {
    const ref = await doc(database, 'posts', routerId)
    const snap = await getDoc(ref)
    setSinglePost(snap.data())
  } catch (error) {
    console.log(error)
  }
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

//リロード時にエラーになる
//特定カテゴリの新しい投稿を取得
export const getCategoriPosts = async (setPostData, postCategori) => {
  const postRef = collection(database, 'posts')
  const categoriPosts = query(
    postRef,
    where('categori', '==', postCategori),
    orderBy('timestamp', 'desc'),
  )

  onSnapshot(categoriPosts, (querySnapshot) => {
    setPostData(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  })
}

//特定カテゴリの古い投稿を取得
export const getCategoriOldPosts = async (setPostData, postCategori) => {
  const postRef = collection(database, 'posts')
  const categoriPosts = query(postRef, where('categori', '==', postCategori), orderBy('timestamp'))

  onSnapshot(categoriPosts, (querySnapshot) => {
    setPostData(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  })
}

//特定カテゴリのいいね順の投稿を取得
export const getCategoriLikePosts = async (setPostData, postCategori) => {
  const postRef = collection(database, 'posts')
  const categoriPosts = query(
    postRef,
    where('categori', '==', postCategori),
    orderBy('likes', 'desc'),
  )

  onSnapshot(categoriPosts, (querySnapshot) => {
    setPostData(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  })
}

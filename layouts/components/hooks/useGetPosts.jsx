import { onSnapshot, collection, query, orderBy, where } from 'firebase/firestore'
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

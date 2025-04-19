import { arrayUnion, arrayRemove, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import { database } from '../../firebaseConfig'

/**
 * いいねの追加
 */
export const LikeAdd = async (routerId: string, likes: number, email: string): Promise<void> => {
  const post = doc(database, 'posts', routerId)
  updateDoc(post, {
    likes: likes + 1,
    likesEmail: arrayUnion(email),
  })
    .then(() => {
      // setOn((prev) => !prev)
      // setLikecount(0)
      // setTimeout(() => {
      //   useGetPost(setSinglePost, routerId)
      // }, 2000)
    })
    .catch((err) => {
      console.log(err)
    })
}

/**
 * いいねの削除
 */
export const LikeDelete = async (routerId: string, likes: number, email: string): Promise<void> => {
  const post = doc(database, 'posts', routerId)
  updateDoc(post, {
    likes: likes - 1,
    likesEmail: arrayRemove(email),
  })
    .then(() => {
      // setLikecount(0)
      // useGetPost(setSinglePost, routerid)
    })
    .catch((err) => {
      console.log(err)
    })
}

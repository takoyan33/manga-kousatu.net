import { arrayUnion, arrayRemove, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import { database } from 'firebaseConfig'
import { successNotify, errorNotify } from 'layouts/components/text'

//いいねの追加
export const LikeAdd = (routerId: string, likes: number, email: string) => {
  let post = doc(database, 'posts', routerId)
  updateDoc(post, {
    likes: likes + 1,
    likesEmail: arrayUnion(email),
  })
    .then(() => {
      // setOn((prev) => !prev)
      // setLikecount(0)
      // setTimeout(() => {
      //   useGetPost(setSinglePost, routerid)
      // }, 2000)
    })
    .catch((err) => {
      console.log(err)
    })
}

//いいねの削除
export const LikeDelete = (routerid: string, likes: number, email: string) => {
  let post = doc(database, 'posts', routerid)
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

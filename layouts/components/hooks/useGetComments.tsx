import {
  onSnapshot,
  collection,
  query,
  orderBy,
  where,
  getDocs,
  doc,
  deleteDoc,
} from 'firebase/firestore'
import { database } from 'firebaseConfig'
import { successNotify, errorNotify } from 'layouts/components/text'

//特定の投稿のコメントを全て取得
export const getComments = async (setComments, routerId) => {
  const commentsRef = collection(database, 'comments')
  const postComments = await query(commentsRef, where('postid', '==', routerId))
  onSnapshot(postComments, (querySnapshot) => {
    setComments(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  })
}

//自分のコメント

//コメントの投稿

//コメントの削除
export const deleteComment = async (commentId: string) => {
  let deleteComment = doc(database, 'comments', commentId)
  deleteDoc(deleteComment)
    .then(() => {
      successNotify('コメントを削除しました')
    })
    .catch(() => {
      errorNotify('コメントの削除に失敗しました')
    })
}

//コメントの編集

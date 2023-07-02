import { onSnapshot, collection, query, orderBy, where, getDocs } from 'firebase/firestore'
import { database } from 'firebaseConfig'

//特定の投稿のコメントを全て取得
//一旦ストップ　投稿時にエラーが出る
export const getComments = async (setComments, routerId) => {
  const commentseRef = collection(database, 'comments')
  const postComments = await query(commentseRef, where('postid', '==', routerId))
  try {
    const querySnapshot = await getDocs(postComments)
    const allcomments = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))
    await setComments(allcomments)
  } catch (error) {
    console.log('Error fetching user data', error)
  }
}

//自分のコメント

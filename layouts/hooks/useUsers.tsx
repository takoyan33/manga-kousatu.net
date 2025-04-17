import { getDocs, doc, getDoc, collection, query, where, onSnapshot } from 'firebase/firestore'
import { useState, useEffect, SetStateAction, Dispatch } from 'react'
import { database } from '../../firebaseConfig'
import { usersRef } from '../../utils/post'
import { GetPost } from 'types/post'

/**
 * 自分のuserを取得
 * @returns myUser
 */
export const useGetMyUser = async (setUsers: any, uid: string): Promise<void> => {
  try {
    const ref = await doc(database, 'users', uid)
    const snap = await getDoc(ref)
    setUsers(snap.data())
  } catch (error) {
    console.log(error)
  }
}

// export const useGetMyUser = (uid: string): GetPost[] => {
//   const [myUser, setMyUser] = useState<GetPost[]>([])

//   useEffect(() => {
//     if (!uid) {
//       return
//     }

//     const postsRef = collection(database, 'posts')
//     const myPostsQuery = query(postsRef, where('email', '==', uid))

//     const unsubscribe = onSnapshot(myPostsQuery, (querySnapshot) => {
//       const posts = querySnapshot.docs.map(
//         (doc) =>
//           ({
//             ...doc.data(),
//             id: doc.id,
//           } as GetPost),
//       )

//       setMyUser(posts)
//     })

//     return () => unsubscribe()
//   }, [uid])

//   return myUser
// }

/**
 * 他のuserを取得
 * @returns user
 */
export const useGetOtherUser = async (
  setUsers: Dispatch<SetStateAction<any>>,
  uid: string,
): Promise<void> => {
  try {
    const ref = await doc(database, 'users', uid)
    const snap = await getDoc(ref)
    setUsers(snap.data())
  } catch (error) {
    console.log(error)
  }
}

/**
 * user全体を取得
 * @returns users
 */
export const useGetUsers = async (setUsers: Dispatch<SetStateAction<any>>): Promise<void> => {
  await getDocs(usersRef).then((response) => {
    //コレクションのドキュメントを取得
    setUsers(
      response.docs.map((data) => {
        //配列なので、mapで展開する
        return { ...data.data(), id: data.id }
        //スプレッド構文で展開して、新しい配列を作成
      }),
    )
  })
}

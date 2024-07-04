import { onSnapshot, collection, query, where, getDocs } from 'firebase/firestore'
import { database } from 'firebaseConfig'
import { usersRef } from 'layouts/utils/post'

//自分のuserを取得
export const useGetMyUser = async (setUsers, userEmail: string) => {
  const myUser = query(usersRef, where('email', '==', userEmail))

  onSnapshot(myUser, (querySnapshot) => {
    setUsers(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  })
}

//他のuserを取得
export const useGetOtherUser = async (setUsers, userid: string) => {
  const otherUser = query(usersRef, where('userid', '==', userid))

  onSnapshot(otherUser, (querySnapshot) => {
    setUsers(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  })
}

//user全体を取得
export const useGetUsers = async (setUsers) => {
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

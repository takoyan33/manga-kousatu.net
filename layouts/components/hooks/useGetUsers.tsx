import { onSnapshot, collection, query, where, getDocs } from 'firebase/firestore'
import { database } from 'firebaseConfig'

//自分のuserを取得
export const useGetMyUser = async (setUsers, userEmail) => {
  const usersRef = collection(database, 'users')
  const myUser = query(usersRef, where('email', '==', userEmail))

  onSnapshot(myUser, (querySnapshot) => {
    setUsers(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  })
}

//他のuserを取得
export const useGetOtherUser = async (setUsers, userid) => {
  const usersRef = collection(database, 'users')
  const otherUser = query(usersRef, where('userid', '==', userid))

  onSnapshot(otherUser, (querySnapshot) => {
    setUsers(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  })
}

//user全体を取得
export const useGetUsers = async (setUsers) => {
  const usersRef = collection(database, 'users')

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

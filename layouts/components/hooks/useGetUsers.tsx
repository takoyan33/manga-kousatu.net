import { onSnapshot, collection, query, orderBy, where, getDocs } from 'firebase/firestore'
import { database } from 'firebaseConfig'

//自分のuserを取得
export const getMyUser = async (setUsers, userEmail) => {
  const usersRef = collection(database, 'users')
  const myUser = query(usersRef, where('email', '==', userEmail))

  onSnapshot(myUser, (querySnapshot) => {
    setUsers(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    console.log('user取得成功')
  })
}

//user全体を取得
export const getUsers = async (setUsers) => {
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

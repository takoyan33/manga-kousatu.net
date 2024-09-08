import { getDocs, doc, getDoc } from 'firebase/firestore'
import { database } from '../../../firebaseConfig'
import { usersRef } from '../../../layouts/utils/post'

//自分のuserを取得
export const useGetMyUser = async (setUsers, uid: string) => {
  try {
    const ref = await doc(database, 'users', uid)
    const snap = await getDoc(ref)
    setUsers(snap.data())
  } catch (error) {
    console.log(error)
  }
}

//他のuserを取得
export const useGetOtherUser = async (setUsers, uid: string) => {
  try {
    const ref = await doc(database, 'users', uid)
    const snap = await getDoc(ref)
    setUsers(snap.data())
  } catch (error) {
    console.log(error)
  }
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

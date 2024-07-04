import { database } from 'firebaseConfig'
import { collection } from 'firebase/firestore'

//postsのコレクションを取得
export const postsRef = collection(database, 'posts')

//usersのコレクションを取得
export const usersRef = collection(database, 'users')
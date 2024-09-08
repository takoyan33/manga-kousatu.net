import { collection } from 'firebase/firestore'
import { database } from '../../firebaseConfig'

//postsのコレクションを取得
export const postsRef = collection(database, 'posts')

//usersのコレクションを取得
export const usersRef = collection(database, 'users')

import { collection, CollectionReference } from 'firebase/firestore'
import { database } from '../firebaseConfig'

// Firestoreのコレクション名
const COLLECTION_NAMES = {
  POSTS: 'posts',
  USERS: 'users',
} as const

/**
 * Firestoreのpostsコレクションへの参照を取得します
 */
export const postsRef: CollectionReference = collection(database, COLLECTION_NAMES.POSTS)

/**
 * Firestoreのusersコレクションへの参照を取得します
 */
export const usersRef: CollectionReference = collection(database, COLLECTION_NAMES.USERS)

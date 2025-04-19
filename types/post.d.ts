import { Timestamp } from 'firebase/firestore'

//取得POSTの型
export type GetPost = {
  category: 'ONEPIECE' | '呪術廻戦' | '東京リベンジャーズ' | 'キングダム'
  context: string
  contextImage: string
  createdAt: string
  display: 'true' | 'false'
  displayName: string | null
  downloadURL: string
  updatedAt: string
  email: string
  id: string
  likes: number
  likesEmail: string[]
  netabare: 'spoil' | 'notSpoil'
  photoURL: string | null
  selected: string[]
  timestamp: { seconds: number; nanoseconds: number }
  title: string
  userid: string
}

//CardPost時の型
export type CardPostParams = Pick<
  GetPost,
  | 'downloadURL'
  | 'id'
  | 'title'
  | 'category'
  | 'netabare'
  | 'context'
  | 'createdAt'
  | 'likes'
  | 'userid'
>

export interface GetPost {
  category: string
  context: string
  contextImage: string
  createTime: string
  display: boolean
  displayName: string | null
  downloadURL: string
  editTime: string
  email: string
  id: string
  likes: number
  likesEmail: string[]
  netabare: string
  photoURL: string | null
  selected: string[]
  timestamp: { seconds: number; nanoseconds: number }
  title: string
  userid: string
}

export interface SingleGetPostParams {
  downloadURL: string
  id: string
  title: string
  category: string
  netabare: string
  context: string
  email: string
  photoURL: string
  displayName: string
  createTime: string
  likes: number
  selected: string[]
  userid: string
}

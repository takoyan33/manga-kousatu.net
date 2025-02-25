//コメントの型定義
export interface GetComment {
  comment: string
  createdAt: string
  id: string
  postid: string
  userid: string
  username: string
  userEmail?: string
  userPhoto: string
  timestamp: Date
  isEdit: boolean
}

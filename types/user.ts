//単一ユーザーの型
export interface GetUser {
  admin: number
  bio: string
  email: string
  favorite: string[]
  id: string
  profileImage: string
  userid: string
  userName: string
}

//プロフィールユーザーの型
export type ProfileParams = Pick<GetUser, 'profileImage' | 'id' | 'userName' | 'bio' | 'favorite'>
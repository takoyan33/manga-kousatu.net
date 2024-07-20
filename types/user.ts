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


export interface ProfileParams {
  profileImage: string
  id: string
  userName: string
  bio: string
  favorite: string[]
}
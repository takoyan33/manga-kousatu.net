//CardPost
export interface SinglePost {
  downloadURL: string
  id: number
  title: string
  categori: string
  netabare: string
  context: string
  email: string
  photoURL: string
  displayname: string
  createtime: string
  likes: string
  selected: string[]
}

//ImageUpload
export interface ImageUploadProps {
  text: string
  createObjectURL?: string
  createcontextObjectURL?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

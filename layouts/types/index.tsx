//CardPost
export type SinglePost = {
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
export type ImageUploadProps = {
  text: string
  createObjectURL: string
  createcontextObjectURL: string
  onChange: any
}

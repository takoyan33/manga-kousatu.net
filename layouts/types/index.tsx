

//ImageUpload
export interface ImageUploadProps {
  text: string
  createObjectURL?: string
  createcontextObjectURL?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

//ImageUpload
import React from 'react'

export interface ImageUploadProps {
  text?: string
  createObjectURL?: string
  createcontextObjectURL?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

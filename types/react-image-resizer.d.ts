declare module 'react-image-resizer' {
  import { ComponentType } from 'react'

  interface ImageResizerProps {
    src: string
    className?: string
    width?: number
    height?: number
    alt?: string
  }

  const ImageResizer: ComponentType<ImageResizerProps>
  export default ImageResizer
}

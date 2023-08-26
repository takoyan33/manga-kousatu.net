import React from 'react'
import { useEffect, useState } from 'react'
import { ImageUploadProps } from 'layouts/types'

//React.memo化
const ImageUploadContext = ({ onChange, createcontextObjectURL }: ImageUploadProps) => {
  return (
    <div>
      <img
        className='m-auto flex w-full items-center  justify-center'
        src={createcontextObjectURL}
        alt='サムネイル'
      />
      <label
        htmlFor='file-input'
        className='bg-primary-900 text-white-900 dark:bg-dark-900 mb-6 flex w-full items-center justify-center rounded px-4 py-2'
      ></label>
      <input
        id='file-input'
        className='hidde
        n'
        type='file'
        multiple
        accept='image/*,.png,.jpg,.jpeg,.gif'
        name='myImage'
        onChange={onChange}
      />
    </div>
  )
}

export default ImageUploadContext

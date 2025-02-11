import React from 'react'
import { SiteLabel } from 'layouts/components/text'
import { ImageUploadProps } from 'types/other'

const ImageUpload = ({ onChange, createObjectURL }: ImageUploadProps) => {
  return (
    <div>
      <SiteLabel name='サムネイル' required htmlFor='thumbnail-input' />
      {createObjectURL && (
        <img
          className='m-auto flex w-60 items-center justify-center'
          src={createObjectURL}
          alt=''
        />
      )}
      <div className='m-auto my-4 text-center'>
        <label
          htmlFor='thumbnail-input'
          className='bg-primary-900 text-white-900 dark:bg-dark-900 mb-6 flex w-full items-center justify-center rounded px-4 py-2'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-10 w-10 hover:cursor-pointer hover:bg-gray-700'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth='2'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
            />
          </svg>
        </label>
        <input
          id='thumbnail-input'
          className='hidden'
          type='file'
          accept='image/*'
          name='myImage'
          onChange={onChange}
        />
      </div>
    </div>
  )
}

export default ImageUpload

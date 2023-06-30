import React from 'react'

type Props = {
  text: string
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  createObjectURL: string
  onChange: any
}

//React.memo化
const ImageUpload: React.VFC<Props> = ({ onChange, createObjectURL }) => {
  return (
    <div>
      <p>サムネイル*</p>
      <img
        className='m-auto flex w-full items-center  justify-center'
        src={createObjectURL}
        alt='サムネイル'
      />
      <label
        htmlFor='file-input'
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
        id='file-input'
        className='hidden'
        type='file'
        accept='image/*'
        name='myImage'
        onChange={onChange}
      />
    </div>
  )
}

export default ImageUpload

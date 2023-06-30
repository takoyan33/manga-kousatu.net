/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { database, auth } from 'firebaseConfig'
import { collection } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { getAuth, sendEmailVerification, updateProfile } from 'firebase/auth'
import Button from '@mui/material/Button'
import { postImage } from 'layouts/api/upload'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { CommonHead } from 'layouts/components/ui'
import Image from 'react-image-resizer'

export default function Photoedit() {
  const [image, setImage] = useState<string>()
  const [result, setResult] = useState('')
  const router = useRouter()
  const databaseRef = collection(database, 'posts')
  const [createObjectURL, setCreateObjectURL] = useState<string>(null)
  const [downloadURL, setDownloadURL] = useState<string>(null)
  const [firedata, setFiredata] = useState([])
  const user = auth.currentUser

  useEffect(() => {
    let token = localStorage.getItem('Token')
    if (token) {
    }
    if (!token) {
      router.push('/register')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]

      setImage(file)
      setCreateObjectURL(URL.createObjectURL(file))
    }
  }

  const updatename = async () => {
    const result = await postImage(image)
    setResult(result)
    updateProfile(auth.currentUser, {
      photoURL: result,
    })
      .then(() => {
        alert('プロフィールを更新しました。')
        setResult('')
        router.push('/profile')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div>
      <CommonHead />

      <h2 className='my-12 text-center text-2xl font-semibold'>プロフィール画像の編集</h2>

      <p className='my-5'>
        現在のユーザー画像
        {user && (
          <Image
            className='m-auto max-w-sm text-center'
            height={100}
            width={100}
            src={user.photoURL}
          />
        )}
      </p>

      <Box
        component='form'
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete='off'
      >
        <div>
          <img
            className='m-auto flex w-full items-center  justify-center'
            src={createObjectURL}
            alt='画像'
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
        </div>
        <input
          id='file-input'
          className='hidden'
          type='file'
          accept='image/*'
          name='myImage'
          onChange={uploadToClient}
        />
      </Box>

      <Button variant='outlined' className='m-5' onClick={updatename}>
        画像を更新する
      </Button>
      <Button variant='outlined' className='m-5'>
        <Link href='/profile'>戻る</Link>
      </Button>
    </div>
  )
}

import AccountCircle from '@mui/icons-material/AccountCircle'
import {
  Button,
  TextField,
  Stack,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
} from '@mui/material'
import { getAuth } from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { useEffect, useState, useCallback } from 'react'
import { TagsInput } from 'react-tag-input-component'
import { database } from 'firebaseConfig'
import { postImage } from 'layouts/api/upload'
import 'react-toastify/dist/ReactToastify.css'
import { SiteButton } from 'layouts/components/button'
import { successNotify, errorNotify } from 'layouts/components/text'
import { SiteLabel } from 'layouts/components/text'
import { CommonHead } from 'layouts/components/ui'

export default function RegisterProfile() {
  const [selected, setSelected] = useState<string[]>(['ワンピース'])
  const [image, setImage] = useState<any>(null)
  const [username, setUsername] = useState<number>(null)
  const [bio, setBio] = useState<number>(null)
  const [createObjectURL, setCreateObjectURL] = useState<string>('')
  const [result, setResult] = useState<string>('')

  const router = useRouter()
  const auth = getAuth()
  const user = auth.currentUser

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [user])

  const uploadImage = (event): void => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]

      setImage(file)
      setCreateObjectURL(URL.createObjectURL(file))
    }
  }

  const registerProfile = async () => {
    let result = ''
    if (image) {
      result = await postImage(image)
    } else {
      result = ''
    }
    setResult(result)
    const userRef = await doc(database, 'users', user.uid)
    //写真のurlをセットする
    await setDoc(userRef, {
      userName: username,
      bio: bio,
      email: user.email,
      profileImage: result,
      userid: user.uid,
      favorite: selected,
      admin: 0,
    })
      .then(() => {
        successNotify('プロフィールの登録が完了しました！')
        setTimeout(() => {
          router.push('/top').then(() => {
            location.reload()
          })
        }, 2000)
      })
      .catch((err) => {
        errorNotify('登録に失敗しました！')
        console.error(err)
      })
    // }
  }

  return (
    <div>
      <CommonHead />

      <Stack component='form' className='m-auto' noValidate spacing={2} sx={{ width: '38ch' }}>
        <h2 className='m-5 my-12 text-center text-2xl font-semibold'>プロフィール登録</h2>
        <p>詳細なプロフィールの記載をお願いします。</p>

        <div className='mb-2'>
          <SiteLabel name='ユーザー画像' htmlFor='myImage' />
        </div>

        <div>
          <img
            className='m-auto flex w-60 items-center justify-center'
            src={createObjectURL}
            alt='ユーザー画像'
          />
        </div>
        <div className='m-auto my-4 text-center'>
          <label
            htmlFor='file-input'
            className='bg-primary-900 text-white-900 dark:bg-dark-900 m-auto mb-6 w-full rounded px-4 py-2 text-center'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='m-auto h-10 w-10 text-center hover:cursor-pointer hover:bg-gray-700'
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
            className='m-auto hidden text-center'
            type='file'
            accept='image/*'
            name='myImage'
            onChange={uploadImage}
          />
        </div>
        <div className='mb-2'>
          <SiteLabel name='ユーザーの名前（10文字以内）' required htmlFor='name' />
        </div>
        <Input
          id='name'
          startAdornment={
            <InputAdornment position='start'>
              <AccountCircle />
            </InputAdornment>
          }
          onChange={(event: any) => setUsername(event.target.value)}
        />
        <div className='mb-2'>
          <SiteLabel name='プロフィール（最大50文字）' htmlFor='profileText' />
        </div>
        <TextField
          id='profileText'
          placeholder='よろしくお願いします。'
          type='text'
          variant='outlined'
          className='w-100 m-auto'
          onChange={(event: any) => setBio(event.target.value)}
        />

        <div className='mb-2'>
          <SiteLabel name='好きな漫画（最大10作品）' htmlFor='likeManga' />
        </div>
        <TagsInput
          value={selected}
          onChange={setSelected}
          name='likeManga'
          placeHolder='タグを追加してください'
        />
        <div>
          <SiteButton
            id='registerProfile'
            onClick={registerProfile}
            text='新規登録'
            className='m-auto my-4 w-80 text-center'
          />
        </div>
      </Stack>
    </div>
  )
}

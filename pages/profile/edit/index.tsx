/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { database } from 'firebaseConfig'
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  query,
  orderBy,
  limit,
  where,
} from 'firebase/firestore'
import { useRouter } from 'next/router'
import Button from '@mui/material/Button'
import { postImage } from 'layouts/api/upload'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Image from 'react-image-resizer'
import { TagsInput } from 'react-tag-input-component'
import { CommonHead } from 'layouts/components/ui'
import { useAuthContext } from 'layouts/context/AuthContext'
import { successNotify, errorNotify } from 'layouts/components/text'
import { useGetMyPosts, useGetMyUser } from 'layouts/components/hooks'
import { GetUser } from 'types/user'
import { ToastContainer } from 'react-toastify'

export default function Edit() {
  const { user } = useAuthContext()
  const [image, setImage] = useState<any>()
  const [result, setResult] = useState<string>('')
  const [users, setUsers] = useState<GetUser>()
  const router = useRouter()
  const [createObjectURL, setCreateObjectURL] = useState<string>('')
  const [username, setUsername] = useState<string>(null)
  const [bio, setBio] = useState<string>(null)
  const [selected, setSelected] = useState<string[]>([''])

  useEffect(() => {
    if (!user) {
      router.push('/register')
    } else {
      useGetMyUser(setUsers, user.uid)
    }
  }, [])

  const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      if (!event) {
        setImage('')
        setCreateObjectURL('')
      } else {
        const file = event.target.files[0]
        setImage(file)
        setCreateObjectURL(URL.createObjectURL(file))
      }
    } else {
      setImage('')
      setCreateObjectURL('')
    }
  }

  const updateUserData = async (id: string) => {
    //更新する
    let fieldToEdit = doc(database, 'users', id)
    //セットしたIDをセットする
    const result = await postImage(image)
    setResult(result)
    updateDoc(fieldToEdit, {
      userName: username,
      bio: bio,
      email: user.email,
      profileImage: result,
      userId: user.uid,
      favorite: selected,
    })
      .then(() => {
        successNotify('ユーザー情報が更新されました')
        setUsername('')
        setBio('')
        setTimeout(() => {
          router.push('/profile')
        }, 2000)
      })
      .catch((err) => {
        errorNotify('ユーザー情報が更新に失敗しました')
        console.log(err)
      })
  }

  return (
    <div className='m-auto max-w-5xl'>
      <CommonHead />
      <ToastContainer />
      <div key={users?.id}>
        <h2 className='my-12 text-center text-2xl font-semibold'>プロフィールの編集</h2>

        <p className='font-semib my-12 text-center'>
          現在のプロフィール画像
          <br />
          <div className='flex justify-center'>
            <Image
              className='m-auto max-w-sm text-center'
              height={100}
              width={100}
              src={users?.profileImage}
            />
          </div>
          {users?.profileImage === '' && (
            <p className='my-8 text-center'>設定している画像はありません</p>
          )}
        </p>

        <Box component='form' className='' noValidate autoComplete='off'>
          <>
            <p className='my-4 text-center'>新しいプロフィール画像</p>
            <br />
            <div className='flex justify-center'>
              <Image
                className='m-auto max-w-sm text-center'
                height={100}
                width={100}
                src={createObjectURL}
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
            <label className='my-4 text-center' htmlFor='outlined-name'>
              名前（最大10文字）<span className='text-red-600'>*</span>
            </label>
            <div className='text-center'>
              <input
                id='outlined-name'
                className='sm:text-md block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                defaultValue={users?.userName}
                type='text'
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <br />
            <label className='my-4 text-center'>プロフィール（最大30文字）</label>
            <div className='text-center'>
              <input
                id='outlined-name'
                className='sm:text-md block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                defaultValue={users?.bio}
                type='text'
                placeholder='よろしくお願いします'
                onChange={(event) => setBio(event.target.value)}
              />
            </div>
            <br />
            <p className='my-4 text-center'>
              好きな漫画（最大10作品）<span className='text-red-600'>*</span>
            </p>
            <div className='m-auto text-center'>
              <TagsInput
                value={users?.favorite}
                onChange={setSelected}
                name='selected'
                placeHolder='タグを追加してください'
              />
            </div>
            <br />
            <div className='my-4 text-center'>
              {users?.id}
              <Button
                variant='outlined'
                key={users?.id}
                className='m-auto w-80 text-center'
                onClick={() => updateUserData(users?.id)}
              >
                プロフィールを更新する
              </Button>
            </div>
            <br />
            <div className='my-4 text-center'>
              <Button variant='outlined' className='m-auto w-80 '>
                <Link href='/profile'>戻る</Link>
              </Button>
            </div>
          </>
        </Box>
      </div>
    </div>
  )
}

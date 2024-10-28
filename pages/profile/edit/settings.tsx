/* eslint-disable jsx-a11y/alt-text */
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { getAuth, updateProfile, deleteUser } from 'firebase/auth'
import { doc, updateDoc } from 'firebase/firestore'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Image from 'react-image-resizer'
import { TagsInput } from 'react-tag-input-component'
import { ToastContainer } from 'react-toastify'
import { database } from 'firebaseConfig'
import { postImage } from 'layouts/api/upload'
import { SiteButton } from 'layouts/components/button'
import { useGetMyUser } from 'layouts/components/hooks'
import { successNotify, errorNotify } from 'layouts/components/text'
import { SiteLabel } from 'layouts/components/text'
import { CommonHead } from 'layouts/components/ui'
import { useAuthContext } from 'layouts/context/AuthContext'
import { GetUser } from 'types/user'

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

  const deleteAccount = async () => {
    //userを削除する
    if (user) {
      deleteUser(user)
        //user削除
        .then(() => {
          localStorage.removeItem('Token')
          //tokenを削除
          alert('退会しました。TOP画面に戻ります。')
          router.push('/top')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  return (
    <div className='m-auto max-w-5xl'>
      <CommonHead />
      <ToastContainer />
      <div>
        <h2 className='my-12 text-center text-2xl font-semibold'>アカウント設定</h2>

        <h3 className='my-12 text-left text-xl font-semibold'>パスワード再設定</h3>
        <Link id='EditPassword' href='/profile/edit/password'>
          パスワードの再設定
        </Link>
        <h3 className='my-12 text-left text-xl font-semibold'>メールアドレスの編集</h3>
        <h3 className='mt-12 mb-4 text-left text-xl font-semibold'>アカウントの退会</h3>
        <button id='deleteUser' onClick={deleteAccount}>
          アカウントを退会する
        </button>
      </div>
    </div>
  )
}

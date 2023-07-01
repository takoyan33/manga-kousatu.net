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

export default function Edit() {
  const [image, setImage] = useState<string>()
  const [result, setResult] = useState('')
  const [users, setUsers] = useState(null)
  const router = useRouter()
  const usersRef = collection(database, 'users')
  const [createObjectURL, setCreateObjectURL] = useState<string>(null)
  const [username, setUsername] = useState(null)
  const [bio, setBio] = useState(null)
  const { user } = useAuthContext()
  const [selected, setSelected] = useState([''])
  const my = query(usersRef, where('email', '==', user.email))

  useEffect(() => {
    if (!user) {
      router.push('/register')
    } else {
      usersData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const usersData = async () => {
    //firestoreからデータ取得
    await getDocs(my).then((response) => {
      //コレクションのドキュメントを取得
      setUsers(
        response.docs.map((data) => {
          //配列なので、mapで展開する
          return { ...data.data(), id: data.id }
          //スプレッド構文で展開して、新しい配列を作成
        }),
      )
    })
  }

  const uploadImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      if (event == '') {
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

  const updateUserData = async (id) => {
    //更新する
    let fieldToEdit = doc(database, 'users', id)
    //セットしたIDをセットする
    const result = await postImage(image)
    setResult(result)
    updateDoc(fieldToEdit, {
      username: username,
      bio: bio,
      email: user.email,
      profileimage: result,
      userid: user.uid,
      favarite: selected,
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
    <div>
      <CommonHead />

      {users &&
        users.map((user) => {
          return (
            <>
              <div key={user.id}>
                <h2 className='my-12 text-center text-2xl font-semibold'>プロフィールの編集</h2>

                <p className='font-semib my-12 text-center'>
                  現在のプロフィール画像
                  <br></br>
                  <p className='flex justify-center'>
                    <Image
                      className='m-auto max-w-sm text-center'
                      height={100}
                      width={100}
                      src={user.profileimage}
                    />
                  </p>
                </p>

                <Box component='form' className='' noValidate autoComplete='off'>
                  <>
                    <p className='my-4 text-center'>新しいプロフィール画像</p>
                    <br></br>
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

                    <p className='my-4 text-center'>
                      現在の名前： <span>{user.username}</span>
                    </p>
                    <p className='my-4 text-center'>新しい名前（最大10文字）</p>
                    <div className='text-center'>
                      <TextField
                        id='outlined-basic'
                        value={user.username}
                        label='名前'
                        variant='outlined'
                        className='m-auto w-80'
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                          setUsername(event.target.value)
                        }
                      />
                    </div>
                    <br></br>
                    <p className='my-4 text-center'>
                      現在のプロフィール： <span>{user.bio}</span>
                    </p>
                    <p className='my-4 text-center'>新しいプロフィール（最大30文字）</p>
                    <div className='text-center'>
                      <TextField
                        id='outlined-basic'
                        label='名前'
                        value={user.bio}
                        variant='outlined'
                        className='m-auto w-80'
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                          setBio(event.target.value)
                        }
                      />
                    </div>
                    <br></br>
                    <p className='my-4 text-center'>
                      現在の好きな漫画： <span>{user.favarite}</span>
                    </p>
                    <p className='my-4 text-center'>好きな漫画（最大10作品）*</p>
                    <div className='m-auto w-80 text-center'>
                      <TagsInput
                        value={user.favarite}
                        onChange={setSelected}
                        name='selected'
                        placeHolder='タグを追加してください'
                      />
                    </div>
                    <br></br>
                    <div className='text-center'>
                      <Button
                        variant='outlined'
                        key={user.id}
                        className='m-auto w-80 text-center'
                        onClick={() => updateUserData(user.id)}
                      >
                        プロフィールを更新する
                      </Button>
                    </div>
                    <br></br>
                    <div className='text-center'>
                      <Button variant='outlined' className='m-auto w-80 '>
                        <Link href='/profile'>戻る</Link>
                      </Button>
                    </div>
                  </>
                </Box>
              </div>
            </>
          )
        })}
    </div>
  )
}

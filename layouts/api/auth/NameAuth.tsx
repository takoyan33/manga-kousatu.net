import { Button, Box, TextField } from '@mui/material'
import { getAuth, updateProfile, deleteUser } from 'firebase/auth'
import { collection, getDocs } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { useState, useCallback } from 'react'
import { database } from 'firebaseConfig.js'

export default function NameAuth() {
  const [ID, setID] = useState<number>()
  const [title, setTitle] = useState<string>('')
  const [context, setContext] = useState<string>('')
  const [categori, setCategori] = useState<string>('')
  const auth = getAuth()
  const [displayName, setDisplayName] = useState<string>('')
  const router = useRouter()
  const [createtime, setCreatetime] = useState<string>('')
  const [isUpdate, setIsUpdate] = useState<boolean>(false)
  const postsData = collection(database, 'posts')
  const [firedata, setFiredata] = useState([])
  const [downloadURL, setDownloadURL] = useState<string>()
  const [result, setResult] = useState<string>('')

  const updateName = async () => {
    if (auth.currentUser) {
      updateProfile(auth.currentUser, {
        displayName: displayName,
      })
        .then(() => {
          alert('プロフィールを更新しました。')
          setDisplayName('')
          setResult('')
          router.push('/profile')
        })
        .catch((error) => {
          console.error(error)
        })
    } else {
      console.error('No user is currently signed in.')
    }
  }

  return (
    <>
      <Box
        component='form'
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete='off'
      >
        <h2>名前の更新</h2>

        <TextField
          id='outlined-basic'
          placeholder='名前'
          variant='outlined'
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setDisplayName(event.target.value)
          }
        />
      </Box>
      <Button variant='outlined' className='m-5' onClick={updateName}>
        名前を更新する
      </Button>
    </>
  )
}

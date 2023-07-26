import React, { useState, useCallback } from 'react'
import { database } from 'firebaseConfig.js'
import { collection, getDocs } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { getAuth, updateProfile, deleteUser } from 'firebase/auth'
import { Button, Box, TextField } from '@mui/material'

export default function NameAuth() {
  const [ID, setID] = useState(null)
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
  const [downloadURL, setDownloadURL] = useState<string>(null)
  const [result, setResult] = useState<string>('')

  const updateName = async () => {
    updateProfile(auth.currentUser, {
      displayName: displayName,
    })
      .then(() => {
        alert('プロフィールを更新しました。')
        setDisplayName('')
        setResult('')
        getallPost()
        router.push('/profile')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const getallPost = async () => {
    await getDocs(postsData).then((response) => {
      setFiredata(
        response.docs.map((data) => {
          return { ...data.data(), id: data.id }
        }),
      )
    })
  }

  const getID = (id, title, context, downloadURL, categori, cratetime, displayname, createtime) => {
    setID(id)
    setContext(context)
    setTitle(title)
    setDownloadURL(downloadURL)
    setIsUpdate(true)
    setCategori(categori)
    setCreatetime(cratetime)
    setDisplayName(displayname)
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
          label='名前'
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

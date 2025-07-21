import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { getAuth, sendEmailVerification } from 'firebase/auth'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { CommonHead } from 'layouts/components/ui'

export default function Emaildedit() {
  const [email, setEmail] = useState<string>('')
  const router = useRouter()
  const auth = getAuth()
  const user = auth.currentUser

  useEffect(() => {
    const token = localStorage.getItem('Token')

    if (!token) {
      router.push('/register')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateEmail = async () => {
    if (auth.currentUser) {
      sendEmailVerification(auth.currentUser).then(() => {
        alert('確認メールを送信しました。')
      })
    } else {
      alert('ユーザーが見つかりません。')
    }
  }

  return (
    <div>
      <CommonHead title='プロフィールの編集' isNoIndex />
      <h2 className='my-5'>メールアドレスの編集</h2>

      <p className='my-5'>メールアドレス： {user && <span>{user.email}</span>}</p>

      <Box
        component='form'
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete='off'
      >
        <TextField
          id='outlined-basic'
          placeholder='新しいメールアドレス'
          variant='outlined'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </Box>
      <Button variant='outlined' className='m-5' onClick={updateEmail}>
        更新する
      </Button>
    </div>
  )
}

import React, { useState } from 'react'
import { CommonHead } from 'layouts/components/ui'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { usePasswordReset } from 'layouts/api/auth/useAuth'
import { Alert, Grid, Link } from '@mui/material'

export default function Password() {
  const [email, setEmail] = useState('')
  const { success, error, passwordReset } = usePasswordReset()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    passwordReset(email)
  }

  return (
    <div style={{ height: '750px' }}>
      <CommonHead />
      <div style={{ maxWidth: '320px', margin: '0 auto' }}>
        <h1 className='m-5 my-12 text-center text-2xl font-semibold'>パスワード再設定</h1>
        <div>
          <label className='my-4 mt-10 text-center'>
            メールアドレス<span className='text-red-600'>*</span>
          </label>
        </div>
        <TextField
          margin='normal'
          required
          fullWidth
          id='email'
          label='sample@gmail.com'
          name='email'
          autoComplete='email'
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type='submit' fullWidth variant='outlined' sx={{ mt: 3, mb: 2 }}>
          送信
        </Button>

        <Grid container sx={{ justifyContent: 'center' }} className='my-4'>
          <Grid item>
            <Link href='/login' variant='body2'>
              戻る
            </Link>
          </Grid>
        </Grid>
      </div>

      {error && <Alert severity='error'>メールアドレスに送信できませんでした</Alert>}
      {success && <Alert severity='success'>メールアドレスに送信しました</Alert>}
    </div>
  )
}

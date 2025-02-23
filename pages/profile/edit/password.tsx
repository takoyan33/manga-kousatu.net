import { Alert, Grid, Link } from '@mui/material'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import React, { useState } from 'react'
import { useAuth } from 'layouts/api/auth/useAuth'
import { NoIndexHead } from 'layouts/components/ui'

export default function Password() {
  const [email, setEmail] = useState('')
  const { resetPassword, error, loading } = useAuth()
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await resetPassword(email)
      setIsSuccess(true)
    } catch (err) {
      console.error('Password reset failed:', err)
    }
  }

  return (
    <div style={{ height: '750px' }}>
      <NoIndexHead />
      <div style={{ maxWidth: '320px', margin: '0 auto' }}>
        <h1 className='m-5 my-12 text-center text-2xl font-semibold'>パスワード再設定</h1>
        <form onSubmit={handleSubmit}>
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
            placeholder='sample@gmail.com'
            name='email'
            autoComplete='email'
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type='submit'
            fullWidth
            variant='outlined'
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            送信
          </Button>

          <Grid container sx={{ justifyContent: 'center' }} className='my-4'>
            <Grid item>
              <Link href='/login' variant='body2'>
                戻る
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>

      {error && <Alert severity='error'>メールアドレスに送信できませんでした</Alert>}
      {isSuccess && <Alert severity='success'>メールアドレスに送信しました</Alert>}
    </div>
  )
}

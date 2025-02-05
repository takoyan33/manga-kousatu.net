'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { TextField } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { ToastContainer } from 'react-toastify'
import * as yup from 'yup'
import { useLogin } from './useAuth'
import { SiteButton } from 'layouts/components/button'
import 'react-toastify/dist/ReactToastify.css'
import { successNotify, errorNotify, SiteLabel } from 'layouts/components/text'
import { LoginUserFormInput } from 'types/auth'

// バリデーションルール
const schema = yup.object({
  email: yup.string().required('必須です').email('正しいメールアドレス入力してください'),
  password: yup.string().required('必須です').min(8, '文字数が足りません'),
})

export default function LoginAuth() {
  const auth = getAuth()
  const router = useRouter()
  const googleProvider = new GoogleAuthProvider()
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserFormInput>({
    resolver: yupResolver(schema),
  })

  const { login } = useLogin()

  const handleSignIn = (data: LoginUserFormInput) => {
    startTransition(() => {
      login(data.email, data.password)
        .then(() => {
          successNotify('ログインしました')
          setTimeout(() => {
            router.push('/')
          }, 2000)
        })
        .catch(() => {
          errorNotify('ログインに失敗しました')
        })
    })
  }

  const SignInWithGoogle = async () => {
    startTransition(() => {
      signInWithPopup(auth, googleProvider)
        .then(() => {
          successNotify('ログインしました')
          setTimeout(() => {
            router.push('/')
          }, 2000)
        })
        .catch(() => {
          errorNotify('ログインに失敗しました')
        })
    })
  }

  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <>
      <div style={{ maxWidth: '320px', margin: '0 auto' }}>
        <form>
          <ToastContainer />
          <div className='mb-2'>
            <SiteLabel name='メールアドレス' required htmlFor='email' />
          </div>
          <div>
            <TextField
              id='email'
              placeholder='sample@gmail.com'
              className='m-auto mb-6 w-80'
              variant='outlined'
              {...register('email')}
              error={'email' in errors}
              autoComplete='email'
            />
            <span className='text-sm text-red-600'>{errors.email?.message}</span>
            <div className='mt-6 mb-2'>
              <SiteLabel name='パスワード(8文字以上)' required htmlFor='password' />
            </div>
          </div>
          <div className='m-auto'>
            <OutlinedInput
              className='m-auto w-80'
              placeholder='Password'
              required
              id='password'
              {...register('password', { minLength: 8 })}
              error={Boolean(errors.password)}
              type={showPassword ? 'text' : 'password'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label={showPassword ? 'hide the password' : 'display the password'}
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge='end'
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <span className='text-sm text-red-600'>{errors.password?.message}</span>
          </div>
          <p className='pb-6 pt-6 text-center underline'>
            <Link href='/profile/edit/password'>パスワードをお忘れの方はこちら</Link>
          </p>
          <SiteButton
            onClick={handleSubmit(handleSignIn)}
            id='login'
            text='ログイン'
            className='m-auto my-4 w-80 text-center'
            varient='contained'
            disabled={isPending}
          />
          <p className='text-center'>または</p>
          <SiteButton
            text='Googleでログイン'
            onClick={SignInWithGoogle}
            className='m-auto my-4 w-80 text-center'
            google
            disabled={isPending}
          />
          <p className='my-8 text-center'>
            ユーザー未登録の方はこちら
            <span className='cursor-pointer text-blue-500 underline'>
              <Link href='/register'>新規登録</Link>
            </span>
          </p>
        </form>
      </div>
    </>
  )
}

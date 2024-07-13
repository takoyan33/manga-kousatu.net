import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SiteButton } from 'layouts/components/button'
import Link from 'next/link'
import { Stack, TextField } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { successNotify, errorNotify } from 'layouts/components/text'
import { useLogin, SignInWithGoogle } from './useAuth'
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserFormInput>({
    resolver: yupResolver(schema),
  })

  const { success, error, login } = useLogin()

  const handleSignIn = async (data: LoginUserFormInput) => {
    try {
      await login(data.email, data.password)
      successNotify('ログインしました')
      setTimeout(() => {
        router.push('/top')
      }, 2000)
    } catch (e) {
      errorNotify('ログインに失敗しました')
      console.log(e)
    }
  }

  const SignInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider)
      .then(() => {
        successNotify('ログインしました')
        setTimeout(() => {
          router.push('/top')
        }, 2000)
      })
      .catch((e) => {
        errorNotify('ログインに失敗しました')
        console.log(e)
      })
  }

  return (
    <>
      <div style={{ maxWidth: '320px', margin: '0 auto' }}>
        <>
          <ToastContainer />
          <div>
            <label className='my-4 mt-10 text-center'>
              メールアドレス<span className='text-red-600'>*</span>
            </label>
          </div>
          <div>
            <TextField
              id='outlined-basic'
              label='sample@gmail.com'
              className='m-auto mb-6 w-80'
              variant='outlined'
              {...register('email')}
              error={'email' in errors}
              helperText={errors.email?.message}
            />
            <div className='mt-6'>
              <label className='my-4 text-center'>
                パスワード（8文字以上)<span className='text-red-600'>*</span>
              </label>
            </div>
          </div>
          <div className='m-auto'>
            <TextField
              id='outlined-basic'
              label='Password'
              variant='outlined'
              type='password'
              className='m-auto mb-6 w-80'
              {...register('password')}
              error={'password' in errors}
              helperText={errors.password?.message}
            />
          </div>
          <p className='pb-6 pt-6 text-center underline'>
            <Link href='/profile/edit/password'>パスワードをお忘れの方はこちら</Link>
          </p>
          <SiteButton
            href=''
            onClick={handleSubmit(handleSignIn)}
            text='ログイン'
            className='m-auto my-4 w-80 text-center'
          />
          <SiteButton
            href=''
            text='Googleでログイン'
            onClick={SignInWithGoogle}
            className='m-auto my-4 w-80 text-center'
          />
          <p className='my-8 text-center'>
            ユーザー未登録の方はこちら
            <Link href='/register'>
              <span className='text-blue-500 underline'>新規登録</span>
            </Link>
          </p>
        </>
      </div>
    </>
  )
}

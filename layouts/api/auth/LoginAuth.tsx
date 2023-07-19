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
import { useLogin } from './useAuth'

// フォームの型
type FormInput = {
  email: string
  password: string
}

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
  } = useForm<FormInput>({
    resolver: yupResolver(schema),
  })

  const { login, success, error } = useLogin()

  const handleSignIn: SubmitHandler<FormInput> = async (data: any) => {
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
      <Stack component='form' className='m-auto' noValidate spacing={2} sx={{ width: '38ch' }}>
        <>
          <ToastContainer />
          <div>
            <label className='my-4 text-center'>
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
            <div>
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
          <p className='my-4'>
            ユーザー未登録の方はこちら
            <Link href='/register'>
              <span className='text-blue-500 underline'>新規登録</span>
            </Link>
          </p>
          <p className='my-4'>
            パスワードを忘れた方はこちら
            <br />
            <Link href='/profile/edit/password'>
              <span className='text-blue-500 underline'>パスワード再設定</span>
            </Link>
          </p>
        </>
      </Stack>
    </>
  )
}

import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { Box, TextField } from '@mui/material'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SiteButton } from 'layouts/components/button'

// フォームの型
interface FormParams {
  email: string
  password: string
}

// バリデーションルール
const schema = yup.object({
  email: yup.string().required('必須です').email('正しいメールアドレス入力してください'),
  password: yup.string().required('必須です').min(8, '文字数が足りません'),
})

export default function Index() {
  const auth = getAuth()
  const router = useRouter()
  const googleProvider = new GoogleAuthProvider()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormParams>({
    resolver: yupResolver(schema),
  })

  const SignIn: SubmitHandler<FormParams> = (formData) => {
    alert('ログインしました')
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        const user = userCredential.user
        user.getIdToken().then((accessToken) => {
          localStorage.setItem('Token', accessToken)
          setTimeout(() => {
            router.push('/')
          }, 2000)
        })
      })
      .catch((err) => {
        alert('ログインできません')
        console.log(err)
      })
  }

  const SignInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result)
        const token = credential.accessToken
        const user = result.user
        localStorage.setItem('Token', token)
        alert('ログインしました')
        setTimeout(() => {
          router.push('/')
        }, 2000)
      })
      .catch((err) => {
        alert('登録できませんでした')
        console.log(err)
      })
  }

  return (
    <>
      <Box
        component='form'
        className='flex max-w-7xl justify-center '
        noValidate
        autoComplete='off'
      >
        <div>
          <label className='my-4 text-center'>メールアドレス*</label>
          <TextField
            id='outlined-basic'
            label='sample@gmail.com'
            className='m-auto w-80'
            variant='outlined'
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
            {...register('email')}
            error={'email' in errors}
            helperText={errors.email?.message}
          />

          <label className='my-4 text-center'>パスワード（8文字以上)*</label>
          <TextField
            id='outlined-basic'
            label='Password'
            variant='outlined'
            type='password'
            className='m-auto w-80'
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(event.target.value)
            }
            {...register('password')}
            error={'password' in errors}
            helperText={errors.password?.message}
          />
          <SiteButton
            onClick={handleSubmit(SignIn)}
            text='ログイン'
            className='m-auto my-8 w-80'
          />
          <SiteButton
            text='Googleでログイン'
            onClick={SignInWithGoogle}
            className='m-auto my-8 w-80'
          />
        </div>
      </Box>
    </>
  )
}

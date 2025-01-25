import { yupResolver } from '@hookform/resolvers/yup'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { TextField } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useForm } from 'react-hook-form'
import { ToastContainer } from 'react-toastify'
import * as yup from 'yup'
import { useSignup } from './useAuth'
import { SiteButton } from 'layouts/components/button'
import { SiteLabel, successNotify, errorNotify } from 'layouts/components/text'
import 'react-toastify/dist/ReactToastify.css'
import { RegisterUserFormInput } from 'types/auth'

// バリデーションルール
const schema = yup.object({
  email: yup.string().required('必須です').email('正しいメールアドレス入力してください'),
  password: yup.string().required('必須です').min(8, '文字数が足りません'),
  confirmPassword: yup
    .string()
    .required('必須です')
    .oneOf([yup.ref('password')], 'パスワードが一致していません'),
})

export default function SignUp() {
  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const router = useRouter()
  const googleProvider = new GoogleAuthProvider()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterUserFormInput>({
    resolver: yupResolver(schema),
  })

  const { signup, error } = useSignup()

  const handleSignUp = async (data: RegisterUserFormInput) => {
    const { email, password } = data
    await signup(email, password)
    successNotify('ユーザー登録完了しました')
    setTimeout(() => {
      router.push('/registerprofile')
    }, 2000)

    if (error) {
      errorNotify('ユーザー登録失敗しました')
    }
  }

  const SignUpWithGoogle = async () => {
    const auth = getAuth()
    await signInWithPopup(auth, googleProvider)
      .then(() => {
        //googleで登録する
        successNotify('ユーザー登録完了しました')
        setTimeout(() => {
          router.push('/registerprofile')
        }, 2000)
      })
      .catch(() => {
        errorNotify('ユーザー登録失敗しました')
      })
  }

  return (
    <>
      <div style={{ maxWidth: '320px', margin: '0 auto' }}>
        <form>
          <ToastContainer />
          <div className='mb-2'>
            <SiteLabel name='メールアドレス' required htmlFor='email' />
          </div>
          <TextField
            id='email'
            placeholder='sample@gmail.com'
            className='m-auto w-80'
            variant='outlined'
            {...register('email', { required: true })}
            error={Boolean(errors.email)}
            autoComplete='email'
          />
          <span className='text-sm text-red-600'>{errors.email?.message}</span>

          <div className='mt-6 mb-2'>
            <SiteLabel name='パスワード(8文字以上)' required htmlFor='password' />
          </div>
          <OutlinedInput
            className='m-auto w-80'
            placeholder='Password'
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
          <div className='mt-6 mb-2'>
            <SiteLabel name='確認用パスワード(8文字以上)' required htmlFor='confirmPassword' />
          </div>
          <OutlinedInput
            className='m-auto w-80'
            placeholder='Password'
            id='confirmPassword'
            {...register('confirmPassword', { minLength: 8 })}
            error={Boolean(errors.confirmPassword)}
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
          <span className='text-sm text-red-600'>{errors.confirmPassword?.message}</span>
          <SiteButton
            id='signUp'
            onClick={handleSubmit(handleSignUp)}
            text='新規登録'
            className='my-4 w-80 text-center'
            varient='contained'
          />
          <p className='text-center'>または</p>
          <SiteButton
            id='googleSignUp'
            text='Googleで新規登録'
            onClick={SignUpWithGoogle}
            className='my-4 w-80 text-center'
            google
          />
          <p className='my-8 text-center'>
            登録済みの方はこちら
            <Link href='/login'>
              <span className='text-blue-500 underline'>ログイン</span>
            </Link>
          </p>
          <ToastContainer
            position='top-right'
            autoClose={6000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme='light'
          />
        </form>
      </div>
    </>
  )
}

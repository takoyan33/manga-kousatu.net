import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import Link from 'next/link'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SiteButton } from 'layouts/components/button'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { successNotify, errorNotify } from 'layouts/components/text'
import { Stack, TextField } from '@mui/material'
import { useSignup } from './useAuth'

// フォームの型
type FormInput = {
  email: string
  password: string
  confirmPassword: string
}

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
  const router = useRouter()
  const googleProvider = new GoogleAuthProvider()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(schema),
  })

  const { signup, error } = useSignup()

  const handleSignUp = async (data: FormInput) => {
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
      <Stack component='form' className='m-auto' noValidate spacing={2} sx={{ width: '38ch' }}>
        <ToastContainer />
        <div>
          <label className='my-4 text-center'>
            メールアドレス<span className='text-red-600'>*</span>
          </label>
        </div>
        <TextField
          id='outlined-basic'
          label='sample@gmail.com'
          className='m-auto w-80'
          variant='outlined'
          {...register('email', { required: true })}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
        />
        <div>
          <label className='my-4 text-center'>
            パスワード（8文字以上)<span className='text-red-600'>*</span>
          </label>
        </div>
        <TextField
          id='outlined-basic'
          label='Password'
          type='password'
          variant='outlined'
          className='m-auto w-80'
          {...register('password', { minLength: 8 })}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
        />
        <div>
          <label className='my-4 text-center'>
            確認用パスワード（8文字以上)<span className='text-red-600'>*</span>
          </label>
        </div>
        <TextField
          id='outlined-basic'
          label='Password'
          type='password'
          variant='outlined'
          className='m-auto w-80'
          {...register('confirmPassword', {
            validate: (value) => value === watch('password'),
          })}
          error={Boolean(errors.confirmPassword)}
          helperText={errors.confirmPassword?.message}
        />
        <SiteButton
          href=''
          onClick={handleSubmit(handleSignUp)}
          text='新規登録'
          className='m-auto my-8 w-80 text-center'
        />
        <SiteButton
          href=''
          text='Googleで新規登録'
          onClick={SignUpWithGoogle}
          className='m-auto my-4 w-80 text-center'
        />
        <p className='my-4'>
          登録済みの方はこちら
          <Link href='/login'>
            <span className='text-blue-500 underline'>ログイン</span>
          </Link>
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
        </p>
      </Stack>
    </>
  )
}

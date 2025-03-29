import Login from 'layouts/api/auth/Login'
import { CommonHead } from 'layouts/components/ui'

export default function LoginPage() {
  return (
    <div style={{ height: '750px' }}>
      <CommonHead title='Manga Study - ログイン' />
      <h1 className='m-5 my-12 text-center text-2xl font-semibold'>ログイン</h1>
      <Login />
    </div>
  )
}

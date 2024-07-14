import LoginAuth from 'layouts/api/auth/LoginAuth'
import { CommonHead } from 'layouts/components/ui'

export default function Login() {
  return (
    <div style={{ height: '750px' }}>
      <CommonHead />
      <h1 className='m-5 my-12 text-center text-2xl font-semibold'>ログイン</h1>
      <LoginAuth />
    </div>
  )
}

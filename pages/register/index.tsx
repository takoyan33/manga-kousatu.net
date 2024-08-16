import SignUp from 'layouts/api/auth/SignUp'
import { CommonHead } from 'layouts/components/ui/CommonHead'

export default function Register() {
  return (
    <div style={{ height: '750px' }}>
      <CommonHead />
      <h1 className='m-5 my-12 text-center text-2xl font-semibold'>新規登録</h1>
      <SignUp />
    </div>
  )
}

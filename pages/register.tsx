import { CommonHead } from '../layouts/components/ui/CommonHead'
import SignUp from '../layouts/api/auth/SignUp'

export default function Register() {
  return (
    <div>
      <CommonHead />
      <h2 className='m-5 my-12 text-center text-2xl font-semibold'>新規登録</h2>
      <SignUp />
    </div>
  )
}

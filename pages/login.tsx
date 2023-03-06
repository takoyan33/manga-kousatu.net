import { useRouter } from 'next/router'
import Loginauth from '../layouts/api/auth/Loginauth'
import { CommonHead } from '../layouts/components/ui/CommonHead'

export default function Login() {
  return (
    <div>
      <CommonHead />
      <h2 className='m-5 my-12 text-center text-2xl font-semibold'>ログイン</h2>

      <Loginauth />
    </div>
  )
}

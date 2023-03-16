import { useRouter } from 'next/router'
import Link from 'next/link'

const ErrorPage = () => {
  const router = useRouter()
  return (
    <>
      <h2 className='text-center text-4xl my-2 font-bold'>404</h2>
      <p className='text-center my-4'>{router.asPath} ページは存在しません</p>
      <Link href='/'>
        <p className='text-center my-4'>ホームに戻る</p>
      </Link>
    </>
  )
}

export default ErrorPage

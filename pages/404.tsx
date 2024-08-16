import Link from 'next/link'
import { useRouter } from 'next/router'

const ErrorPage = () => {
  const router = useRouter()
  return (
    <>
      <h2 className='my-2 text-center text-4xl font-bold'>404</h2>
      <p className='my-4 text-center'>{router.asPath} ページは存在しません</p>
      <Link href='/top'>
        <p className='my-4 text-center'>ホームに戻る</p>
      </Link>
    </>
  )
}

export default ErrorPage

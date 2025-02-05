import Link from 'next/link'

const ErrorPage = () => {
  return (
    <>
      <h2 className='my-2 text-center text-4xl font-bold'>404</h2>
      <p className='my-4 text-center'> ページは存在しません</p>
      <p className='my-4 text-center'>ホームに戻る</p>
    </>
  )
}

export default ErrorPage

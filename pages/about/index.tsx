import { POST_CATEGORIES, COPY_WRITES, CommonHead, CardPost } from 'layouts/components/ui'

export default function About() {
  return (
    <div>
      <div className='flex min-h-screen flex-col items-center justify-center'>
        <CommonHead />
        <h1 className='m-5 my-12 text-center text-2xl font-semibold'>About</h1>
        <div className='mx-auto max-w-2xl text-center'>
          <p className='mb-6 text-lg'>
            Manga Studyでは、漫画の考察などを自由に投稿・閲覧できるwebサイトです。
          </p>
          <ul className='list-disc'>
            <li className='mb-2'>
              運営者: <span className='font-medium'>阿部 舜平</span>
            </li>
            <li className='mb-2'>
              メールアドレス:
              <a href='mailto:harrier2070@gmail.com' className='text-blue-500 hover:underline'>
                harrier2070@gmail.com
              </a>
            </li>
          </ul>
          <div className='my-4'>
            <h2 className='my-2 text-xl font-semibold'>掲載漫画</h2>
            {COPY_WRITES.map((copyWrite, index) => (
              <p key={index}>{copyWrite}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

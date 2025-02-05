'use client'

import { COPY_WRITES, CommonHead, TopTitle } from '../../layouts/components/ui'

export default function About() {
  return (
    <div className='m-auto w-11/12 md:w-full'>
      <div className='min-h-screen'>
        <CommonHead title='Manga Study - About' />
        <TopTitle title='About' />
        <div>
          <p className='mb-6 text-lg'>
            Manga Studyでは、漫画の考察などを自由に投稿・閲覧できるwebサイトです。
          </p>
          <ul className='list-disc'>
            <h3 className='mb-2 list-none text-left text-lg font-bold'>運営者</h3>
            <li className='mb-6 list-none font-medium'>阿部 舜平</li>
            <h3 className='mb-2 list-none text-left text-lg font-bold'>メールアドレス</h3>
            <li className='mb-2 list-none text-left'>
              <a href='mailto:harrier2070@gmail.com' className='text-blue-500 hover:underline'>
                harrier2070@gmail.com
              </a>
            </li>
          </ul>
          <div className='my-8'>
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

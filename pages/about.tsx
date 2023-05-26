import React from 'react'
import { CommonHead } from '../layouts/components/ui/CommonHead'

function About() {
  return (
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
      </div>
    </div>
  )
}

export default About

import Image from 'next/image'
import Link from 'next/link'

export const Footer = () => (
  <>
    <div className='d-block m-auto mt-6 w-11/12 max-w-4xl justify-between pb-6 md:mt-16 md:flex md:w-full'>
      <div>
        <Link href='/'>
          <div>
            <Image height={20} width={150} src='/logo.png' alt='logo' data-testid='image' />
          </div>
        </Link>
      </div>
      <div>
        <p className='my-2 text-lg font-semibold hover:opacity-50 md:my-0 md:text-sm'>
          <Link href='/about'>About</Link>
        </p>
      </div>
      <div>
        <p className='my-2 text-lg font-semibold hover:opacity-50 md:my-0 md:text-sm'>
          <Link href='/top'>Manga Studyとは</Link>
        </p>
      </div>
      <div>
        <p className='my-2 text-lg font-semibold hover:opacity-50 md:my-0 md:text-sm'>
          <Link href='/releasenotes'>更新履歴</Link>
        </p>
      </div>
    </div>
    <div className='mt-4 border py-4 text-center'>Manga Study ©︎{new Date().getFullYear()}</div>
  </>
)

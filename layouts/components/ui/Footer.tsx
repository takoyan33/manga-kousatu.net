import Link from 'next/link'

export const Footer = () => (
  <>
    <div className='m-auto mt-16 flex max-w-4xl justify-between'>
      <div>
        <Link href='/top'>
          <img height={100} width={150} src='/logo.png' alt='logo' />
        </Link>
        <p className='my-4 text-sm'>漫画記事考察サイト</p>
      </div>
      <div>
        <p className='text-sm font-semibold'>
          <Link href='/about'>About</Link>
        </p>
      </div>
      <div>
        <p className='text-sm font-semibold'>
          <Link href='/'>Manga Studyとは</Link>
        </p>
      </div>
      <div>
        <p className='text-sm font-semibold'>
          <Link href='/releasenotes'>更新履歴</Link>
        </p>
      </div>
    </div>
    <div className='mt-4 border py-4 text-center'>Manga Study ©︎{new Date().getFullYear()}</div>
  </>
)

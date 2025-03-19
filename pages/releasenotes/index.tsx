import Link from 'next/link'
import { CommonHead, RELEASE_NOTES, TopTitle } from 'layouts/components/ui'

export default function ReleaseNotes() {
  return (
    <div className='m-auto w-11/12 md:w-full'>
      <CommonHead title='Manga Study - リリースノート' />
      <TopTitle title='更新履歴' />
      {RELEASE_NOTES.map(({ version, date, features }) => (
        <div key={version}>
          <h3 className='my-4 mt-8 text-xl font-semibold'>Manga Study {version}</h3>
          <p>{date}</p>
          <h4 className='my-2 text-lg'>変更点</h4>
          {features.map((feature, index) => (
            <p key={index}>{feature}</p>
          ))}
        </div>
      ))}
      <h3 className='my-4'>Github</h3>
      <p className='mb-8 font-semibold'>
        <Link href='https://github.com/takoyan33/manga-kousatu.net' className='hover:opacity-50'>
          https://github.com/takoyan33/manga-kousatu.net
        </Link>
      </p>
    </div>
  )
}

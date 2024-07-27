import { CommonHead, RELEASE_NOTES } from 'layouts/components/ui'

export default function ReleaseNotes() {
  return (
    <div className='m-auto w-11/12 md:w-full'>
      <CommonHead />
      <h1 className='m-5 my-12 text-center text-2xl font-semibold'>Manga Study - 更新履歴</h1>
      {RELEASE_NOTES.map(({ version, date, features }) => (
        <div key={version}>
          <h2 className='my-4 mt-8 text-xl font-semibold'>Manga Study {version}</h2>
          <p>{date}</p>
          <h4 className='my-2 text-lg'>変更点</h4>
          {features.map((feature, index) => (
            <p key={index}>{feature}</p>
          ))}
        </div>
      ))}
      <h3 className='my-4'>Github</h3>
      <p className='mb-8 font-semibold'>
        <a href='https://github.com/takoyan33/manga-kousatu.net' target='_blank' rel='noreferrer'>
          https://github.com/takoyan33/manga-kousatu.net
        </a>
      </p>
    </div>
  )
}

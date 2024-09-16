import Link from 'next/link'
import React from 'react'

interface TopTitleParams {
  title: string
  url?: string
}

// eslint-disable-next-line react/display-name
export const TopTitle = React.memo(({ title, url }: TopTitleParams) => {
  return (
    <div className='my-12'>
      <h2 className='text-left text-2xl font-semibold'>
        {title}
        {url && (
          <span className='ml-4 text-sm text-gray-600'>
            <Link href={url}>すべて見る</Link>
          </span>
        )}
      </h2>
    </div>
  )
})

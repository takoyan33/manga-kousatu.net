import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface BreadcrumbsParams {
  secondTitle: string
  secondUrl?: string
  thirdTitle?: string
  thirdUrl?: string
}

// eslint-disable-next-line react/display-name
export const Breadcrumbs = React.memo(
  ({ secondTitle, secondUrl = '', thirdTitle = '', thirdUrl = '' }: BreadcrumbsParams) => {
    return (
      <div className='flex'>
        <Link href='/' className='hover:text-sky-500'>
          トップ
        </Link>
        {secondTitle && (
          <span className='ml-2 mr-2'>
            <Image
              src='/images/next-arrow.svg'
              width={21}
              height={21}
              className='cursor-pointer'
              alt='スライドショーのナビゲーション'
            />
          </span>
        )}
        {secondTitle && (
          <Link href={secondUrl || '/'} className='hover:text-sky-500'>
            {secondTitle}
          </Link>
        )}
        {thirdTitle && (
          <span className='ml-2 mr-2'>
            <Image
              src='/images/next-arrow.svg'
              width={21}
              height={21}
              className='cursor-pointer'
              alt='スライドショーのナビゲーション'
            />
          </span>
        )}
        {thirdTitle && (
          <Link href={thirdUrl || '/'} className='hover:text-sky-500'>
            {thirdTitle}
          </Link>
        )}
      </div>
    )
  },
)

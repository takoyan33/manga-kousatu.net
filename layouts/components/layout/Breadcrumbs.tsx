import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

// 定数の定義
const ARROW_ICON = {
  src: '/images/next-arrow.svg',
  width: 21,
  height: 21,
  alt: '次のページへ',
} as const

interface BreadcrumbItemProps {
  title: string
  url?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItemProps[]
}

/**
 * パンくずリストの矢印アイコン
 */
const ArrowIcon = () => (
  <span className='ml-2 mr-2'>
    <Image
      src={ARROW_ICON.src}
      width={ARROW_ICON.width}
      height={ARROW_ICON.height}
      alt={ARROW_ICON.alt}
      className='cursor-pointer'
    />
  </span>
)

/**
 * パンくずリストの各項目
 */
const BreadcrumbItem = ({ title, url = '/' }: BreadcrumbItemProps) => (
  <Link href={url} className='hover:text-sky-500'>
    {title}
  </Link>
)

/**
 * パンくずリストコンポーネント
 * @param items - パンくずリストの項目配列
 */
export const Breadcrumbs = React.memo(({ items }: BreadcrumbsProps) => {
  return (
    <nav aria-label='パンくずリスト' className='flex'>
      <BreadcrumbItem title='トップ' url='/' />
      {items.map((item, index) => (
        <React.Fragment key={`${item.title}-${index}`}>
          <ArrowIcon />
          <BreadcrumbItem {...item} />
        </React.Fragment>
      ))}
    </nav>
  )
})

Breadcrumbs.displayName = 'Breadcrumbs'

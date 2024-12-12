import Link from 'next/link'
import { DOMAttributes, FC, memo, ReactNode } from 'react'

interface CategoryParams {
  href: string
  text: 'ONE PIECE' | '呪術廻戦' | '東京リベンジャーズ' | 'キングダム'
  className: string
}

// eslint-disable-next-line react/display-name
export const SiteCategory = memo(({ href, text, className }: CategoryParams) => {
  return (
    <span className={'inline-block rounded border text-center text-sm font-bold' + className}>
      <Link href={href}>{text}</Link>
    </span>
  )
})

SiteCategory.displayName = 'SiteCategory'

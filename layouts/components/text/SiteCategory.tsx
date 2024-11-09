import Link from 'next/link'
import { DOMAttributes, FC, memo, ReactNode } from 'react'

interface CategoryParams {
  href: string
  text: string
  className: string
}

// eslint-disable-next-line react/display-name
export const SiteCategory = memo(({ href, text, className }: CategoryParams) => {
  return (
    <Link
      href={href}
      className={'inline-block rounded border text-center text-sm font-bold' + className}
    >
      {text}
    </Link>
  )
})

SiteCategory.displayName = 'SiteCategory'

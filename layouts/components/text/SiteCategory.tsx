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
    <span className={className}>
      <Link href={href}>{text}</Link>
    </span>
  )
})

SiteCategory.displayName = 'SiteCategory'

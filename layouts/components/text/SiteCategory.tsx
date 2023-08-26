import { DOMAttributes, FC, memo, ReactNode } from 'react'
import Link from 'next/link'

type Props = {
  href: string
  text: string
  className: string
}

// eslint-disable-next-line react/display-name
export const SiteCategory = memo(({ href, text, className }: Props) => {
  return (
    <span className={className}>
      <Link href={href}>{text}</Link>
    </span>
  )
})

SiteCategory.displayName = 'SiteCategory'

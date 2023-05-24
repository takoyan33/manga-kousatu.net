import { DOMAttributes, FC, memo, ReactNode } from 'react'
import Link from 'next/link'
import Button from '@mui/material/Button'

type Props = {
  href: string
  text: string
  className: string
}

// eslint-disable-next-line react/display-name
export const SiteCategory: React.VFC<Props> = memo(({ href, text, className }) => {
  return (
    <span className={className}>
      <Link href={href}>{text}</Link>
    </span>
  )
})

SiteCategory.displayName = 'SiteCategory'

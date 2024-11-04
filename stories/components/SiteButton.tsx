import { Button } from '@mui/material'
import Link from 'next/link'
import { DOMAttributes } from 'react'

interface SiteButtonProps {
  href?: string
  onClick?: DOMAttributes<HTMLButtonElement>['onClick']
  text?: string
  className?: string
  disabled?: boolean
}

export const SiteButton = ({
  href = '',
  onClick,
  text = 'ボタン',
  className,
  disabled,
}: SiteButtonProps) => {
  return (
    <div className={className}>
      <Link href={href}>
        <Button
          variant='outlined'
          onClick={onClick}
          disabled={disabled}
          type='submit'
          sx={{ textTransform: 'none' }}
        >
          {text}
        </Button>
      </Link>
    </div>
  )
}

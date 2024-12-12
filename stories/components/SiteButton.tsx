import { Button } from '@mui/material'
import Link from 'next/link'
import { DOMAttributes } from 'react'

interface SiteButtonProps {
  id?: string
  href?: string
  onClick?: DOMAttributes<HTMLButtonElement>['onClick']
  text?: string
  className?: string
  disabled?: boolean
  varient?: 'outlined' | 'contained'
  google?: boolean
}

export const SiteButton = ({
  href = '',
  onClick,
  text = '',
  className,
  disabled,
  varient = 'outlined',
  google,
}: SiteButtonProps) => {
  return (
    <div className={className}>
      <Link href={href}>
        <Button
          variant={varient}
          onClick={onClick}
          disabled={disabled}
          type='submit'
          sx={{ textTransform: 'none' }}
          className={google ? 'google-btn' : 'incomplete'}
        >
          {text}
        </Button>
      </Link>
    </div>
  )
}

import { Button } from '@mui/material'
import Link from 'next/link'
import { DOMAttributes } from 'react'

interface SiteButtonProps {
  id?: string
  href?: string
  onClick?: DOMAttributes<HTMLButtonElement>['onClick']
  text: string
  className?: string
  disabled?: boolean
  variant?: 'outlined' | 'contained'
  google?: boolean
}

export const SiteButton = ({
  id = '',
  href = '',
  onClick,
  text = '',
  className = '',
  disabled = false,
  variant = 'outlined',
  google = false,
}: SiteButtonProps) => {
  return (
    <div className={className}>
      <Link href={href}>
        <Button
          id={id}
          variant={variant}
          onClick={onClick}
          disabled={disabled}
          aria-label='site-button'
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

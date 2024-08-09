import { Button } from '@mui/material'
import Link from 'next/link'
import { DOMAttributes, memo } from 'react'

interface SiteButtonProps {
  href?: string
  onClick?: DOMAttributes<HTMLButtonElement>['onClick']
  text: string
  className?: string
  disabled?: boolean
  google?: boolean
}

const styles = {
  webButton: {
    textTransform: 'none',
  },
}

export const SiteButton = memo(
  ({ href = '', onClick, text, className, disabled, google }: SiteButtonProps) => {
    return (
      <div className={className}>
        <Link href={href}>
          <Button
            variant='outlined'
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
  },
)

SiteButton.displayName = 'SiteButton'

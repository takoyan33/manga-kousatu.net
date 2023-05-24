import TextField from '@mui/material/TextField'
import React from 'react'

type Props = {
  id: any
  text: string
  label: string
  error: any
  type: string
  helperText: string
  className: string
  variant?: 'standard' | 'outlined' | 'filled' | undefined
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

// eslint-disable-next-line react/display-name
export const CommonInput: React.VFC<Props> = React.memo(
  ({ onChange, error, text, type, helperText, label, id, className, variant }) => {
    return (
      <>
        <div>
          <label className='text-center my-4'>{text}</label>
        </div>
        <TextField
          id={id}
          type={type}
          label={label}
          className={className}
          variant={variant}
          onChange={onChange}
          error={error}
          helperText={helperText}
        />
      </>
    )
  },
)

import TextField from '@mui/material/TextField'
import React from 'react'

interface InputParams {
  id: string
  text: string
  label: string
  error: boolean
  type: string
  helperText: string
  className: string
  variant?: 'standard' | 'outlined' | 'filled' | undefined
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

// eslint-disable-next-line react/display-name
export const CommonInput = React.memo(
  ({ onChange, error, text, type, helperText, label, id, className, variant }: InputParams) => {
    return (
      <>
        <div>
          <label className='my-4 text-center'>{text}</label>
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

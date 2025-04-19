import { Chip } from '@mui/material'
import { memo } from 'react'

interface SpoilParams {
  spoil: 'spoil' | 'notSpoil'
}

// eslint-disable-next-line react/display-name
export const SiteSpoil = memo(({ spoil }: SpoilParams) => {
  if (spoil !== 'spoil') {
    return null
  }

  return (
    <Chip
      label='ネタバレ有'
      color='error'
      variant='outlined'
      sx={{
        marginX: 0.5,
        marginTop: 0.5,
      }}
    />
  )
})

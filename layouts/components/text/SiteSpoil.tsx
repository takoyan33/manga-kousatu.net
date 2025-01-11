import { memo } from 'react'

interface SpoilParams {
  netabare: string
}

// eslint-disable-next-line react/display-name
export const SiteSpoil = memo(({ netabare }: SpoilParams) => {
  return (
    <div>
      {netabare === 'spoil' && (
        <span className='mx-1 mt-1 inline-block rounded border border-red-500 py-1 px-2 text-center text-sm'>
          ネタバレ有
        </span>
      )}
    </div>
  )
})

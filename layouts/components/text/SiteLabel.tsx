import { memo } from 'react'

interface LabelParams {
  name: string
  required?: boolean
  htmlFor: string
}

// eslint-disable-next-line react/display-name
export const SiteLabel = memo(({ name, required, htmlFor }: LabelParams) => {
  return (
    <label className='my-4 text-center' htmlFor={htmlFor}>
      {name}
      {required && (
        <span className='ml-2 mb-1 rounded-lg bg-red-500 py-1 px-2 text-sm text-white'>必須</span>
      )}
    </label>
  )
})

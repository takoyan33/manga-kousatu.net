/* eslint-disable react/display-name */
import React from 'react'

interface buttonParams {
  text: string
  onClick?: () => void
}

//React.memo化
export const OpenButton = React.memo(({ text, onClick }: buttonParams) => {
  return (
    <button
      onClick={onClick}
      type='button'
      aria-label='open-button'
      className='open-button mt-2 inline-block bg-yellow-500 p-1 text-center text-white'
    >
      {text}
    </button>
  )
})

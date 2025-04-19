/* eslint-disable react/display-name */
import { Chip } from '@mui/material'
import Link from 'next/link'
import React from 'react'

interface CategoryParams {
  category: 'ONEPIECE' | '呪術廻戦' | '東京リベンジャーズ' | 'キングダム'
}

// MUI用の色・スタイルマッピング
const categoryStyles: Record<CategoryParams['category'], { color: string; borderColor: string }> = {
  ONEPIECE: { color: '#06b6d4', borderColor: '#06b6d4' }, // cyan-500
  呪術廻戦: { color: '#a855f7', borderColor: '#a855f7' }, // purple-500
  東京リベンジャーズ: { color: '#f43f5e', borderColor: '#f43f5e' }, // rose-500
  キングダム: { color: '#eab308', borderColor: '#eab308' }, // yellow-500
}

export const Category = React.memo(({ category }: CategoryParams) => {
  const style = categoryStyles[category]

  if (!style) {
    console.warn(`Unknown category: ${category}`)
    return null
  }

  return (
    <div className='my-1'>
      <Link href={`/post/categories/${category}`} passHref>
        <Chip
          label={category}
          clickable
          variant='outlined'
          sx={{
            color: style.color,
            borderColor: style.borderColor,
            '&:hover': {
              opacity: 0.5,
            },
            cursor: 'pointer',
          }}
        />
      </Link>
    </div>
  )
})

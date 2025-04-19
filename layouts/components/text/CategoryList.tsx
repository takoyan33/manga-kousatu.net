/* eslint-disable react/display-name */
import { Chip } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import { POST_CATEGORIES } from 'layouts/components/ui'

// Tailwindのborder-*クラスをカラーコードに変換
const classToColorMap: Record<string, string> = {
  'border-cyan-500': '#06b6d4',
  'border-purple-500': '#a855f7',
  'border-rose-500': '#f43f5e',
  'border-yellow-500': '#eab308',
}

export const CategoryList = () => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
      {POST_CATEGORIES.map((category) => {
        const color = classToColorMap[category.className] || '#ccc'

        return (
          <Link key={category.id} href={category.link} passHref>
            <Chip
              label={category.title}
              clickable
              variant='outlined'
              sx={{
                fontWeight: 'bold',
                textAlign: 'center',
                borderColor: color,
                color,
                '&:hover': {
                  opacity: 0.5,
                },
              }}
            />
          </Link>
        )
      })}
    </div>
  )
}

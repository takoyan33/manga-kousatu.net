/* eslint-disable react/display-name */
import React from 'react'
import { SiteCategory } from './SiteCategory'

interface CategoryParams {
  category: 'ONEPIECE' | '呪術廻戦' | '東京リベンジャーズ' | 'キングダム'
}

// スタイルと色をマッピング
const categoryStyles: Record<CategoryParams['category'], { border: string; hover: string }> = {
  ONEPIECE: { border: 'border-cyan-500', hover: 'hover:opacity-50' },
  呪術廻戦: { border: 'border-purple-500', hover: 'hover:opacity-50' },
  東京リベンジャーズ: { border: 'border-rose-500', hover: 'hover:opacity-50' },
  キングダム: { border: 'border-yellow-500', hover: 'hover:opacity-50' },
}

// React.memo化
export const Category = React.memo(({ category }: CategoryParams) => {
  const { border } = categoryStyles[category]

  return (
    <div className='my-1'>
      <SiteCategory
        className={`border ${border} p-1 hover:opacity-50`}
        text={category}
        href={`/post/categories/${category}`}
      />
    </div>
  )
})
